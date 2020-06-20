package com.huashi.dao;

import com.huashi.dao.plus.WXUserDAOPlus;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Repository
public interface WXUserDAO  extends BaseDAO<WXUser, Long>, WXUserDAOPlus {

}
