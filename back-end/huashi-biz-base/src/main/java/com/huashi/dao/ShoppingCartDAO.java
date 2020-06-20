package com.huashi.dao;

import com.huashi.dao.plus.ShoppingCartDAOPlus;
import com.huashi.dto.ShoppingCartDTO;
import com.huashi.entity.ShoppingCart;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Repository
public interface ShoppingCartDAO extends BaseDAO<ShoppingCart, Long>, ShoppingCartDAOPlus {

    List<ShoppingCartDTO> findByOrderNo(String orderNo);
}
