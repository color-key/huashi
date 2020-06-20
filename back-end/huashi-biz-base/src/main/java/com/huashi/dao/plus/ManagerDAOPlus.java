package com.huashi.dao.plus;

import com.huashi.entity.Manager;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public interface ManagerDAOPlus {

    public Manager login(String loginName, String password);
}
