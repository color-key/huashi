package com.huashi.entity;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 物流信息
 * @author xiaoyu
 * @data 2020/6/19.
 */
@IDGeneratorTable(table = "logistics_info")
@Entity
@Table
public class LogisticsInfo extends ModifiedEntity<Long> {

    private static final long serialVersionUID = 2215598658826713343L;
    /**
     * 物流单号
     */
    @Column(unique = true)
    private String logisticsNo;
    /**
     * 订单编号
     */
    private String orderNo;
    /**
     * 用户信息
     */
    private String openId;
    /**
     * 物流地址
     */
    private String address;
    /**
     * 联系人
     */
    private String contactPerson;
    /**
     * 联系电话
     */
    private String contactMobile;

    public String getLogisticsNo() {
        return logisticsNo;
    }

    public void setLogisticsNo(String logisticsNo) {
        this.logisticsNo = logisticsNo;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactMobile() {
        return contactMobile;
    }

    public void setContactMobile(String contactMobile) {
        this.contactMobile = contactMobile;
    }
}
