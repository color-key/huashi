package com.huashi.dto;

import com.huashi.framework.core.dto.BaseDTO;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class OrderDTO extends BaseDTO {
    /**
     * 订单编号
     */
    private String orderNo;
    /**
     * 订单状态
     */
    private String suatus;
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

    public String getSuatus() {
        return suatus;
    }

    public void setSuatus(String suatus) {
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
