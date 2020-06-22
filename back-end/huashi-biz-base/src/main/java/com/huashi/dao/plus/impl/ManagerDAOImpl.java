package com.huashi.dao.plus.impl;

import com.huashi.dao.plus.ManagerDAOPlus;
import com.huashi.entity.Manager;
import com.huashi.framework.core.dao.impl.BaseDAOImpl;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/2.
 */
public class ManagerDAOImpl extends BaseDAOImpl implements ManagerDAOPlus {

    @Override
    public Manager login(String loginName, String password) {
        StringBuilder sb = new StringBuilder("from Manager user where 1=1");
        sb.append(" {and {user.username = :username}}");
        sb.append(" {and {user.password = :password}}");

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("username", loginName);
        params.put("password", password);

        Query query = buildQuery(sb, params, false);
        List<Manager> accounts = query.getResultList();
        if(accounts!=null && accounts.size()>0){
            return accounts.iterator().next();
        }
        return null;
    }
}
