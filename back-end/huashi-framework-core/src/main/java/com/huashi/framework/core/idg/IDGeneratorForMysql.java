package com.huashi.framework.core.idg;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.scanner.ClassScanner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;

/**
 * 使用MYSQL对ID生成器的具体实现。
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class IDGeneratorForMysql implements InitializingBean, IDGenerator {
    private Logger logger = LoggerFactory.getLogger(IDGeneratorForMysql.class);
    private List<DataSource> dbSources;
    private List<IDGeneratorDataSource> idgDataSources = new ArrayList<>();
    private List<String> tableNames = new ArrayList<>();
    private Map<String, Long> startID = new HashMap<String, Long>();
    private static final int HEARTBEAT_TIME = 1000 * 60;// one minute
    private int accessIndexNumber = 0;//
    public static final String CREATE_TABLE_SQL = "CREATE TABLE IF NOT EXISTS `%s` (`id` bigint(20) NOT NULL,PRIMARY KEY (`id`)) ENGINE=MyISAM DEFAULT CHARSET=utf8";
    public static final String INSERT_SQL ="insert into %s(id) select %d from dual where not exists(select * from %s where id>=%d)";
    public static final String QUERY_SQL = "SELECT id FROM %s";
    public static final String UPDATE_SQL = "UPDATE %s SET id = id + %d";


    private void close(Connection conn) {
        try {
            if (conn != null && !conn.isClosed()) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void close(Statement stmt) {
        try {
            if (stmt != null && !stmt.isClosed()) {
                stmt.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void close(ResultSet rs) {
        try {
            if (rs != null && !rs.isClosed()) {
                rs.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public List<DataSource> getDbSources() {
        return dbSources;
    }

    public void setDbSources(List<DataSource> dbSources) {
        this.dbSources = dbSources;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        // init the connection
        if (dbSources == null || dbSources.isEmpty()) {
            logger.error("No available datasources.");
        }

        initTablesAndStartID();

        for (int i = 0; i < dbSources.size(); i++) {
            IDGeneratorDataSource idgDataSource = new IDGeneratorDataSource();
            idgDataSource.setSequenceNumber(i+1);
            idgDataSource.setDs(dbSources.get(i));
            idgDataSource.setActiveFlag(false);
            idgDataSource.setIncremenet(dbSources.size());
            idgDataSources.add(idgDataSource);
        }
        for (IDGeneratorDataSource idgDataSource : idgDataSources) {
            for(String tableName:tableNames){
                createTable(idgDataSource,tableName);
            }
        }
        heartBeating();
    }

    /**
     * Create table
     * @param idgDataSource
     * @param tableName
     */
    private void createTable(IDGeneratorDataSource idgDataSource, String tableName) {
        String sql = String.format(CREATE_TABLE_SQL, tableName);
        Connection con = idgDataSource.getConnection();
        if (con != null) {
            Statement stat = getStatement(con);
            try {
                stat.executeUpdate(sql);
                idgDataSource.setActiveFlag(true);
            } catch (SQLException e) {
                idgDataSource.setActiveFlag(false);
            }finally{
                close(stat);
                close(con);
            }
        }
    }

    /**
     *
     * @return IDGeneratorDataSource
     */
    private synchronized IDGeneratorDataSource nextIDGeneratorDataSource(){
        boolean anyAvailable =false;
        for (IDGeneratorDataSource idgDataSource : idgDataSources) {
            if(idgDataSource.isActiveFlag()){
                anyAvailable = true;
                break;
            }
        }
        if(!anyAvailable){
            logger.error("No available datasources.");
            return null;
        }
        IDGeneratorDataSource idgDataSource = idgDataSources.get(accessIndexNumber);

        if(accessIndexNumber < idgDataSource.getIncremenet()-1){
            accessIndexNumber++;
        }else{
            accessIndexNumber =0;
        }
        if(idgDataSource.isActiveFlag()){
            return idgDataSource;
        }else{
            return nextIDGeneratorDataSource();
        }
    }

    /**
     * Heartbeats check
     */
    private void heartBeating(){
        new Thread() {
            public void run() {
                while (true) {
                    try{
                        detectDataSource();
                    }catch(Exception e){
                        e.printStackTrace();
                    }
                    try {
                        sleep(HEARTBEAT_TIME);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }

    /**
     * Detect the health of the database and if there is no any recored insert one.
     */
    private void detectDataSource(){
        for (IDGeneratorDataSource idgDataSource : idgDataSources) {
            Connection con =idgDataSource.getConnection();
            Statement stat = getStatement(con);
            if(con!=null && stat!=null && idgDataSource.isActiveFlag()){
                for(String tableName:tableNames){
                    ResultSet result =null;
                    try {
                        result =stat.executeQuery(String.format(QUERY_SQL, tableName));
                        if(!result.next()){//have no any record
                            Long beginID = 0L;
                            if(startID.containsKey(tableName)){
                                beginID = startID.get(tableName);
                            }
                            stat.executeUpdate(String.format(INSERT_SQL, tableName,idgDataSource.getSequenceNumber()+beginID,tableName,idgDataSource.getSequenceNumber()+beginID));
                        }
                        idgDataSource.setActiveFlag(true);
                    } catch (SQLException e) {
                        idgDataSource.setActiveFlag(false);
                    }finally{
                        close(result);
                    }
                }
            }
            close(stat);
            close(con);
        }
    }

    /**Generator ID by a given tableName.
     * @param tableName
     * @return Long
     */
    private Long generator(String tableName) {
        Long currentId = null;
        ResultSet beforeUpdateResult = null;
        ResultSet afterUpdateResult = null;
        IDGeneratorDataSource idgDataSource = null;
        Connection con = null;
        Statement stat = null;
        try {
            String query = String.format(QUERY_SQL, tableName);
            idgDataSource = nextIDGeneratorDataSource();
            con = idgDataSource.getConnection();
            stat = getStatement(con);
            if (con != null && stat != null) {//
                // if there is no table, Throw exception,set the datasource not available.
                beforeUpdateResult = stat.executeQuery(query);
                if (beforeUpdateResult.next()) {
                    currentId = beforeUpdateResult.getLong("id");
                }
                // if there is no record, Throw exception, set the datasource not available.
                String update = String.format(UPDATE_SQL, tableName, idgDataSource.getIncremenet());
                stat.executeUpdate(update);
                afterUpdateResult = stat.executeQuery(query);

                if (afterUpdateResult.next()) {
                    if (afterUpdateResult.getLong("id") - currentId == idgDataSource.getIncremenet()) {
                        currentId = afterUpdateResult.getLong("id");
                    } else {
                        currentId = generator(tableName);
                    }
                }
            }

        } catch (Exception e) {
            idgDataSource.setActiveFlag(false);
            e.printStackTrace();
            return null;
        } finally {
            close(beforeUpdateResult);
            close(afterUpdateResult);
            close(stat);
            close(con);
        }
        return currentId;
    }

    /**
     * It will return null if all of datasource are not available.
     * @param tableName
     * @return Long
     */
    @Override
    public Long generatorID(String tableName){
        for(int i =0;i<dbSources.size();i++){
            Long id = generator(tableName);
            if(id!=null){
                return id;
            }
        }
        return null;
    }

    /**
     * Get the PrepareStatment by given SQL.
     * @return Statement
     */
    private Statement getStatement(Connection con) {
        Statement stmt = null;
        try {
            if (con != null)
                stmt = con.createStatement();
        } catch (Exception e) {
        }
        return stmt;
    }

    private void initTablesAndStartID(){
        Set<Class<?>> classes = ClassScanner.getClasses("com.huashi");
        for (Class<?> clazz : classes) {
            IDGeneratorTable idgTable=clazz.getAnnotation(IDGeneratorTable.class);
            if(idgTable!=null){
                tableNames.add(idgTable.table());
                startID.put(idgTable.table(), idgTable.startID());
            }
        }
    }
}
