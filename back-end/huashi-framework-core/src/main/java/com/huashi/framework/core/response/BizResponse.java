package com.huashi.framework.core.response;

import com.huashi.framework.core.code.CodeEnum;
import com.huashi.framework.core.code.ResponseEnum;

/**
 * 业务对象返回
 *
 * @author xishengchun on 2017-11-03.
 */
public class BizResponse<T> extends BaseResponse {
    /**
     * 返回业务对象
     */
    private T data;

    public BizResponse(CodeEnum codeEnum) {
        super(codeEnum);
    }

    /**
     * 不要使用。
     * 为了解决feign.codec.DecodeException: default constructor not found. class BaseResponse
     */
    public BizResponse() {
        code(ResponseEnum.SUCCESS);
    }

    public BizResponse(CodeEnum codeEnum,T data) {
        this(codeEnum);
        this.data = data;
    }

    public BizResponse(CodeEnum codeEnum, String msg) {
        super(codeEnum, msg);
    }

    public BizResponse(CodeEnum codeEnum, String msg,T data) {
        this(codeEnum, msg);
        this.data = data;
    }

    @Override
    public BizResponse code(CodeEnum code) {
        super.code(code);
        return this;
    }

    @Override
    public BizResponse msg(String msg) {
        super.msg(msg);
        return this;
    }

    @Override
    public BizResponse fail() {
        return code(ResponseEnum.FAIL);
    }

    public  BizResponse fail(String errorMsg) {
        return code(ResponseEnum.FAIL).msg(errorMsg);
    }

    @Override
    public  BizResponse success() {
        return code(ResponseEnum.SUCCESS);
    }

    public static BizResponse response() {
        return new BizResponse().success();
    }

    public  BizResponse success(T data) {
        return code(ResponseEnum.SUCCESS).data(data);
    }



    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public BizResponse data(T data) {
        this.data = data;
        return this;
    }

    public T data() {
        return this.data;
    }
}
