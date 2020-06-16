package com.huashi.framework.core.code;

/**
 * 通用的code
 *
 * @author xishengchun on 2018-02-23.
 */
public enum ResponseEnum implements CodeEnum<ResponseEnum> {

    SUCCESS("0", "操作成功"),
    FAIL("-1", "操作失败"),
    EXCEPTION("-2", "异常"),
    RPC_ERROR("-3", "RPC调用失败"),
    THIRD_API_ERROR("-4", "第三方API调用失败"),

    OPEN_API_ERROR("-51", "OPEN API签名错误"),

    NO_LOGIN("401", "未登入"),
    SIGN_ERROR("403", "签名错误");


    private String code;
    private String msg;
    private String desc;

    ResponseEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
        this.desc = msg;
    }


    @Override
    public String getCode() {
        return this.code;
    }

    @Override
    public String getMsg() {
        return this.msg;
    }

    @Override
    public String getDesc() {
        return this.desc;
    }


    @Override
    public ResponseEnum desc(String desc) {
        this.desc = desc;
        return this;
    }

    public static boolean success(String code) {
        return SUCCESS.getCode().equals(code);
    }

    public static boolean fail(String code) {
        return FAIL.getCode().equals(code);
    }

    public static boolean exception(String code) {
        return EXCEPTION.getCode().equals(code);
    }
}
