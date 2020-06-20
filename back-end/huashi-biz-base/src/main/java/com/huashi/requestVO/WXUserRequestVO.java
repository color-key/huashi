package com.huashi.requestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class WXUserRequestVO extends BaseRequestVO {
    private static final long serialVersionUID = 1511290356120891947L;

    /**
     * 登入ID
     */
    private String loginId;
    /**
     * openId
     */
    private String openId;
    /**
     * 登入密码
     */
    private String password;
    /**
     * 联系人
     */
    private String name;
    /**
     * 手机号码(验证)
     */
    private String mobile;
    /**
     * 门店
     */
    private String store;
    /**
     * 状态 0:不可以人脸扫码；1:可以人脸扫描
     */
    private Integer status = 0;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}
