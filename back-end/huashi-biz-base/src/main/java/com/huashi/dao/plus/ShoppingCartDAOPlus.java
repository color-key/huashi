package com.huashi.dao.plus;

import com.huashi.entity.ShoppingCart;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.searchRequestVO.ShoppingCartSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface ShoppingCartDAOPlus {
    PaginatorResult<ShoppingCart> findShoppingCart(ShoppingCartSearchRequestVO requestVO, PaginatorRequest pr);
}
