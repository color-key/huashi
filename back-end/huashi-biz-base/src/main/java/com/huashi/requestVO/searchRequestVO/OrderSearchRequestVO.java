package com.huashi.requestVO.searchRequestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class OrderSearchRequestVO extends BaseRequestVO {

    private static final long serialVersionUID = -497678933503509222L;

    private String openId;
    /**
     * 模糊查询关键字(订单、客户)
     */
    private String keyword;
    /**
     * 下单时间范围
     */
    private String startDate;
    /**
     * 下单时间范围
     */
    private String endDate;
    /**
     * 是否展示购物车
     */
    private Boolean showShoppingCart = false;

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Boolean getShowShoppingCart() {
        return showShoppingCart;
    }

    public void setShowShoppingCart(Boolean showShoppingCart) {
        this.showShoppingCart = showShoppingCart;
    }
}
