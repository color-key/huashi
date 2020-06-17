package com.huashi.framework.core.idg;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public interface IDGenerator {
    /**
     * ID生成方法，可以有不同版本的实现(Mysql,Redis,Mongodb等)
     * @param tableName
     * @return Long
     */
    public Long generatorID(String tableName);
}
