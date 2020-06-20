package com.huashi.dao;

import com.huashi.dao.plus.ShoppingCartDAOPlus;
import com.huashi.entity.ShoppingCart;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Repository
public interface ShoppingCartDAO extends BaseDAO<ShoppingCart, Long>, ShoppingCartDAOPlus {

}
