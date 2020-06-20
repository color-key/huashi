package com.huashi.enumeration;

/**
 * @author xiaoyu
 * @data 2020/6/21.
 */
public enum WXUserStatusEnum {
    NOT_OPENED(0, "未开通"),
    AUDITED(1, "已审核"),
    OPENED(2, "已开通");

    private int value;
    private String name;

    private WXUserStatusEnum(int value, String name){
        this.value = value;
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

    public static String getName(Integer value){
        switch (value){
            case 0:
                return NOT_OPENED.name;
            case 1:
                return AUDITED.name;
            case 2:
                return OPENED.name;
            default:
                return "";
        }
    }
}
