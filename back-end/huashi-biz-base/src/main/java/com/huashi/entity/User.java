package com.huashi.entity;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * 用户
 * @author xiaoyu
 * @data 2020/5/31.
 */
@IDGeneratorTable(table = "user")
@Entity
@Table
public class User extends ModifiedEntity<Long> {

    private static final long serialVersionUID = 4483110540309233105L;
    // 昵称
    private String nickname;
    // 用户名
    private String name;
    // 用真实姓名
    private String fullName;
    // 手机号
    private String mobile;
    // 邮箱
    private String mailbox;
    // 密码
    private String password;
    // 角色
    private Long roleId;
    // 角色
    private String MFA;
    // 最后登入IP
    private String lastLoginIP;
    // 最后登入时间
    private Date lastLoginTime;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getMailbox() {
        return mailbox;
    }

    public void setMailbox(String mailbox) {
        this.mailbox = mailbox;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getMFA() {
        return MFA;
    }

    public void setMFA(String MFA) {
        this.MFA = MFA;
    }

    public String getLastLoginIP() {
        return lastLoginIP;
    }

    public void setLastLoginIP(String lastLoginIP) {
        this.lastLoginIP = lastLoginIP;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }
}
