package com.huashi.enumeration;

/**
 * 订单状态
 * @author xiaoyu
 * @data 2020/6/19.
 */
public enum OrderStatusEnum {
    UNREVIEWED(0, "未审核"),
    AUDITED(1, "已审核"),
    SHIPPED(2, "已发货"),
    WRONG(3, "有问题");

    private int value;
    private String name;

    private OrderStatusEnum(int value, String name){
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
                return UNREVIEWED.name;
            case 1:
                return AUDITED.name;
            case 2:
                return SHIPPED.name;
            case 3:
                return WRONG.name;
            default:
                return "";
        }
    }

}
