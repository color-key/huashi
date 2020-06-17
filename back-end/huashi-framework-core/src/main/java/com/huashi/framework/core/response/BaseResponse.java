package com.huashi.framework.core.response;

import com.huashi.framework.core.code.CodeEnum;
import com.huashi.framework.core.code.ResponseEnum;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;

/**
 * 操作结果返回
 *
 * @author xishengchun on 2017-10-27.
 */
public class BaseResponse implements Serializable {

    /**
     * 返回码
     */
    public String code;

    /**
     * 返回内容
     */
    private String msg;

    /**
     * 不要使用。
     * 为了解决feign.codec.DecodeException: default constructor not found. class BaseResponse
     */
    public BaseResponse() {
        code(ResponseEnum.SUCCESS);
    }

    public BaseResponse(CodeEnum codeEnum) {
        this.code = codeEnum.getCode();
        this.msg = codeEnum.getDesc();
    }

    public BaseResponse(CodeEnum codeEnum, String msg) {
        this.code = codeEnum.getCode();
        this.msg = msg;
    }



    public BaseResponse success() {
        return code(ResponseEnum.SUCCESS);
    }

    public  BaseResponse fail() {
        return code(ResponseEnum.FAIL);
    }

    public static BaseResponse response(){
        return new BaseResponse().success();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BaseResponse code(CodeEnum code) {
        this.code = code.getCode();
        this.msg = code.getDesc();
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public BaseResponse msg(String msg) {
        this.msg = msg;
        return this;
    }

    public boolean ok() {
        return ResponseEnum.success(this.code);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
