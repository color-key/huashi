package com.huashi.dao;

import com.huashi.dao.plus.ManagerDAOPlus;
import com.huashi.entity.Manager;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Repository
public interface ManagerDAO extends BaseDAO<Manager, Long>, ManagerDAOPlus {

}
