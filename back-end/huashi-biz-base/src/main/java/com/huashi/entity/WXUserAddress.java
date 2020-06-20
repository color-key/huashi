package com.huashi.entity;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 用户地址
 * @author xiaoyu
 * @data 2020/6/19.
 */
@IDGeneratorTable(table = "wx_user_address")
@Entity
@Table(name = "wx_user_address")
public class WXUserAddress extends ModifiedEntity<Long> {

    private static final long serialVersionUID = 5532927064899854254L;
    /**
     * 用户openId
     */
    private String openId;
    /**
     * 用户地址
     */
    private String address;
    /**
     * 联系人
     */
    private String contactName;
    /**
     * 联系电话
     */
    private String contactPhone;

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

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }
}
