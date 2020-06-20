package com.huashi.entity;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * 用户
 * @author xiaoyu
 * @data 2020/5/31.
 */
@IDGeneratorTable(table = "manager")
@Entity
@Table
public class Manager extends ModifiedEntity<Long> {

    private static final long serialVersionUID = 4483110540309233105L;
    /**
     * 用户名
     */
    @Column(unique = true, nullable = false, length = 32)
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
