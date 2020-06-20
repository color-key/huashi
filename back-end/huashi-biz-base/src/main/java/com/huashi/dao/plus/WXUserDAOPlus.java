package com.huashi.dao.plus;

import com.huashi.entity.WXUser;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.requestVO.searchRequestVO.WXUserSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface WXUserDAOPlus {
    PaginatorResult<WXUser> findWXUser(WXUserSearchRequestVO requestVO, PaginatorRequest pr);
}
