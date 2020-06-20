package com.huashi.requestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class OrderRequestVO extends BaseRequestVO {

    private static final long serialVersionUID = -5672482191568869824L;

    private Long id;
    /**
     * 订单编号
     */
    private String orderNo;
    private String openId;
    /**
     * 客户名字
     */
    private String userName;
    /**
     * 订单状态
     */
    private Integer suatus;
    /**
     * 镜框型号
     */
    private String frameModel;
    /**
     * 色号
     */
    private String colorNo;
    /**
     * 备注
     */
    private String remark;
    /**
     * 购物车id集合(例：)
     */
    private String cartIds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getSuatus() {
        return suatus;
    }

    public void setSuatus(Integer suatus) {
        this.suatus = suatus;
    }

    public String getFrameModel() {
        return frameModel;
    }

    public void setFrameModel(String frameModel) {
        this.frameModel = frameModel;
    }

    public String getColorNo() {
        return colorNo;
    }

    public void setColorNo(String colorNo) {
        this.colorNo = colorNo;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCartIds() {
        return cartIds;
    }

    public void setCartIds(String cartIds) {
        this.cartIds = cartIds;
    }
}
