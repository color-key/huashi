package com.huashi.requestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class OrderRequestVO extends BaseRequestVO {

    private static final long serialVersionUID = -5672482191568869824L;
    /**
     * 订单编号
     */
    private String orderNo;
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

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
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
}
