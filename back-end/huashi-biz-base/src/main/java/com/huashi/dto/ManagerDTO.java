package com.huashi.dto;

import com.huashi.framework.core.dto.BaseDTO;
import com.huashi.framework.core.utils.DatetimeUtil;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * 用户DTO
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Component
public class ManagerDTO extends BaseDTO {

    /**
     * 用户名
     */
    private String username;
    /**
     * 用真实姓名
     */
    private String fullName;
    /**
     * 手机号
     */
    private String mobile;
    /**
     * 密码
     */
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
