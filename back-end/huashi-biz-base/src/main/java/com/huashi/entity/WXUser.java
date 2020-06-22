package com.huashi.entity;

import com.huashi.enumeration.WXUserStatusEnum;
import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 微信用户
 * @author xiaoyu
 * @data 2020/6/19.
 */
@IDGeneratorTable(table = "wx_user")
@Entity
@Table(name = "wx_user")
public class WXUser extends ModifiedEntity<Long> {

    private static final long serialVersionUID = -2106752594878233221L;
    /**
     * 登入ID
     */
    private String loginId;
    /**
     * openId
     */
    @Column(unique = true)
    private String openId;
    /**
     * 用户名、联系人
     */
    private String name;
    /**
     * 手机号码(验证)
     */
    @Column(unique = true)
    private String mobile;
    /**
     * 门店
     */
    private String store;
    /**
     * 状态
     * @see WXUserStatusEnum
     */
    private Integer status;
    /**
     * 备注
     */
    private String remark;

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
