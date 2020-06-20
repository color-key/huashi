package com.huashi.entity;

import com.huashi.enumeration.OrderStatusEnum;
import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 订单表
 * @author xiaoyu
 * @data 2020/6/19.
 */
@IDGeneratorTable(table = "wx_order")
@Entity
@Table(name = "wx_order")
public class WXOrder extends ModifiedEntity<Long> {

    private static final long serialVersionUID = -3675186318457490394L;
    /**
     * 订单编号
     */
    @Column(unique = true, nullable = false, length = 32)
    private String orderNo;
    /**
     * 订单状态
     * @see OrderStatusEnum
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
