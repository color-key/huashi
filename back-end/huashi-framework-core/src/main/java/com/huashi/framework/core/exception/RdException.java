package com.huashi.framework.core.exception;

import com.huashi.framework.core.code.CodeEnum;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ContextedRuntimeException;

/**
 * 异常类
 * 通过Contexted,可以设置异常的上下文参数
 * @author xishengchun on 2017-10-27.
 */
public class RdException extends ContextedRuntimeException {

    private CodeEnum codeEnum;

    public RdException(CodeEnum codeEnum) {
        super(codeEnum.getDetail());
        this.codeEnum = codeEnum;
    }

    public RdException(CodeEnum codeEnum, Throwable cause) {
        super(codeEnum.getDetail(), cause);
        this.codeEnum = codeEnum;
    }

    public CodeEnum getCodeEnum() {
        return codeEnum;
    }

    public String getCode() {
        if (codeEnum != null && StringUtils.isNotBlank(codeEnum.getCode())) {
            return codeEnum.getCode();
        }
        return "";
    }

    public String getMsg() {
        if (codeEnum != null && StringUtils.isNotBlank(codeEnum.getMsg())) {
            return codeEnum.getMsg();
        }
        return "";

    }

    public String getDesc() {
        if (codeEnum != null && StringUtils.isNotBlank(codeEnum.getDesc())) {
            return codeEnum.getDesc();
        }
        return "";
    }

}
