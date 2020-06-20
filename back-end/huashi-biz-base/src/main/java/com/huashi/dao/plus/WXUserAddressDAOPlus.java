package com.huashi.dao.plus;

import com.huashi.entity.WXUserAddress;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.searchRequestVO.WXUserAddressSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface WXUserAddressDAOPlus {

    PaginatorResult<WXUserAddress> findWXUserAddress(WXUserAddressSearchRequestVO requestVO, PaginatorRequest pr);
}
