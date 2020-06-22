package com.huashi.framework.core.controller;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class AppResult {

    public static final String SUCCESS = "success";
    public static final String FAILED = "failed";

    /**
     * 成功
     */
    public static String RETURN_SUCCESS = "0000";
    /**
     * 失败
     */
    public static String RETURN_FAIL = "0001";

    private String code;
    private String status;
    private String message;
    private Object data;

    public AppResult(){
        this.status = SUCCESS;
        this.code = RETURN_SUCCESS;
    }

    public AppResult(String code,String status){
        this.code = code;
        this.status = status;
    }
    public AppResult(String code,String status,String message){
        this(code,status);
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return String.format("AppResult [code=%s, status=%s, message=%s, data=%s]", code, status, message, data);
    }
}
