package com.huashi.dao.plus;

import com.huashi.entity.User;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public interface UserDAOPlus{

    public User login(String loginName, String password);
}
