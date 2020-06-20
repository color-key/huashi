package com.huashi.service;

import com.huashi.dto.ShoppingCartDTO;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.ShoppingCartRequestVO;
import com.huashi.requestVO.searchRequestVO.ShoppingCartSearchRequestVO;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface ShoppingCartService {
    PaginatorResult<ShoppingCartDTO> findShoppingCart(ShoppingCartSearchRequestVO requestVO, PaginatorRequest pr);

    ShoppingCartDTO findOne(Long id);

    void saveOrUpdate(ShoppingCartRequestVO requsetVO);

    /**
     * 批量更新购物车
     * @param orderNo
     * @param cartIds
     */
    void update(String orderNo, String cartIds);

    void del(Long id);

    List<ShoppingCartDTO> findByOrderNo(String orderNo);
}
