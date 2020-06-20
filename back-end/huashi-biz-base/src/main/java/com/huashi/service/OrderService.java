package com.huashi.service;

import com.huashi.dto.OrderDTO;
import com.huashi.entity.WXOrder;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.BaseService;
import com.huashi.requestVO.OrderRequestVO;
import com.huashi.requestVO.searchRequestVO.OrderSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface OrderService extends BaseService<WXOrder, OrderDTO, Long> {
    PaginatorResult<OrderDTO> findOrder(OrderSearchRequestVO requestVO, PaginatorRequest pr);

    void saveOrUpdate(OrderRequestVO requsetVO);
}
