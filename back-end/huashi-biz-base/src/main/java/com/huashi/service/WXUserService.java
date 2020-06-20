package com.huashi.service;

import com.huashi.dto.WXUserDTO;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.BaseService;
import com.huashi.requestVO.WXUserRequestVO;
import com.huashi.requestVO.searchRequestVO.WXUserSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface WXUserService extends BaseService<WXUser, WXUserDTO, Long> {

    PaginatorResult<WXUserDTO> findWXUser(WXUserSearchRequestVO requestVO, PaginatorRequest pr);

    WXUser saveOrUpdate(WXUserRequestVO requsetVO);
}
