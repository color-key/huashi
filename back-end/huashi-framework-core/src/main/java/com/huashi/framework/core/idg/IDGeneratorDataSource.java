package com.huashi.framework.core.idg;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * 定义一个ID生成器的数据源类
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class IDGeneratorDataSource {
    /**
     * datasource的顺序号,从1开始
     */
    private int sequenceNumber;
    /**
     * ID每次的增量值(实际上就是所有数据源的总数)
     */
    private int incremenet;
    /**
     * 数据源实例
     */
    private DataSource ds;
    /**
     * 是否激活
     */
    private boolean activeFlag;

    public int getSequenceNumber() {
        return sequenceNumber;
    }
    public void setSequenceNumber(int sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }
    public DataSource getDs() {
        return ds;
    }
    public void setDs(DataSource ds) {
        this.ds = ds;
    }
    public boolean isActiveFlag() {
        return activeFlag;
    }
    public void setActiveFlag(boolean activeFlag) {
        this.activeFlag = activeFlag;
    }
    public int getIncremenet() {
        return incremenet;
    }
    public void setIncremenet(int incremenet) {
        this.incremenet = incremenet;
    }
    /**
     * Get the connection from data source and change the self status.
     * @return Connection
     */
    public Connection getConnection(){
        Connection con= null;
        try {
            con =ds.getConnection();
            activeFlag = true;
        } catch (SQLException e) {
            activeFlag = false;
        }
        return con;
    }
}
