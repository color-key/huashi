package com.huashi.dao;

import com.huashi.dao.plus.UserDAOPlus;
import com.huashi.entity.User;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Repository
public interface UserDAO extends BaseDAO<User, Long>, UserDAOPlus {

}
