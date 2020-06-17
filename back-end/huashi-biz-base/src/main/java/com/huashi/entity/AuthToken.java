package com.huashi.entity;

import com.huashi.framework.core.annotation.IDGeneratorTable;
import com.huashi.framework.core.entity.ModifiedEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author xiaoyu
 * @data 2020/6/4.
 */
@IDGeneratorTable(table = "auth_token")
@Entity
@Table
public class AuthToken extends ModifiedEntity<Long> {

    private static final long serialVersionUID = -3206432020513738578L;

    // token值
    private String token;
    // 登入用户ID
    private String userId;
    // 过期时间
    private Date expireTime;


}
