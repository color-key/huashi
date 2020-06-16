package com.huashi.framework.core.code;

/**
 * Created on 2018/02/23.
 * 所有异常码的公共接口
 *
 * @author xishengchun
 */
public interface CodeEnum<T> {

    /**
     * 错误码
     *
     * @return
     */
    String getCode();

    /**
     * 错误描述,主要给开发人员看
     *
     * @return
     */
    String getMsg();


    /**
     * 错误提示
     * 下发给调用方。
     * 如:下发给App,用于提示接口执行情况
     *
     * @return 默认返回errorMsg
     */
    default String getDesc() {
        return getMsg();
    }

    /**
     * 重新设置错误提示
     *
     * @param desc
     * @return
     */
    default T desc(String desc) {
        throw new IllegalArgumentException("请实现该方法");
    }

    /**
     * 获取错误详情。
     * 用于打印输出
     *
     * @return
     */
    default String getDetail() {
        StringBuffer detailBuffer = new StringBuffer();
        detailBuffer.append("code:").append(getCode())
                .append("  msg:").append(getMsg())
                .append("  desc:").append(getDesc())
        ;
        return detailBuffer.toString();
    }
}
