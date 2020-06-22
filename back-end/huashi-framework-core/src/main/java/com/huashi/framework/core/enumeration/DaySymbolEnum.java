package com.huashi.framework.core.enumeration;

/**
 * 一天的开始和结束字符
 * @author xiaoyu
 * @data 2020/6/20.
 */
public enum DaySymbolEnum {
    START(" 00:00:00"),
    END(" 23:59:59");

    private  String value;

    private DaySymbolEnum(String value) {
        this.value = value;
    }

    public String value(){
        return this.value;
    }
}
