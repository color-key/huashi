package com.huashi.requestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class WXUserRequestVO extends BaseRequestVO {
    private static final long serialVersionUID = 1511290356120891947L;

    private Long id;
    /**
     * 登入ID
     */
    private String loginId;
    /**
     * openId
     */
    private String openId;
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
    /**
     * 备注
     */
    private String remark;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
