package com.huashi.dao.plus;

import com.huashi.entity.WXOrder;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.searchRequestVO.OrderSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface OrderDAOPlus {
    PaginatorResult<WXOrder> findOrder(OrderSearchRequestVO requestVO, PaginatorRequest pr);
}
