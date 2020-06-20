package com.huashi.requestVO.searchRequestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class ShoppingCartSearchRequestVO extends BaseRequestVO {
    private static final long serialVersionUID = -6755439586079327181L;
    /**
     * 用户
     */
    private String wxUserId;
    /**
     * 是否已下单
     */
    private Boolean hasOrderNo = false;
    /**
     * 订单编号
     */
    private String orderNo;

    public String getWxUserId() {
        return wxUserId;
    }

    public void setWxUserId(String wxUserId) {
        this.wxUserId = wxUserId;
    }

    public Boolean getHasOrderNo() {
        return hasOrderNo;
    }

    public void setHasOrderNo(Boolean hasOrderNo) {
        this.hasOrderNo = hasOrderNo;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
}
