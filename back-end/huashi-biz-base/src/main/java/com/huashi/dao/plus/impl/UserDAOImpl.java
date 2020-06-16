package com.huashi.dao.plus.impl;

import com.huashi.dao.plus.UserDAOPlus;
import com.huashi.entity.User;
import com.huashi.framework.core.dao.impl.BaseDAOImpl;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/2.
 */
public class UserDAOImpl extends BaseDAOImpl implements UserDAOPlus {

    @Override
    public User login(String loginName, String password) {
        StringBuilder sb = new StringBuilder("from User user where 1=1");
        sb.append(" {and {user.mailbox = :mailbox}}");
        sb.append(" {and {user.password = :password}}");

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("mailbox", loginName);
        params.put("password", password);

        Query query = buildQuery(sb, params, false);
        List<User> accounts = query.getResultList();
        if(accounts!=null && accounts.size()>0){
            return accounts.iterator().next();
        }
        return null;
    }
}
