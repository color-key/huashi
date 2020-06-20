package com.huashi.dao;

import com.huashi.dao.plus.OrderDAOPlus;
import com.huashi.entity.WXOrder;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Repository
public interface OrderDAO extends BaseDAO<WXOrder, Long>, OrderDAOPlus {

}
