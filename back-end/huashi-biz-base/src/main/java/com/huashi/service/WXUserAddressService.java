package com.huashi.service;

import com.huashi.dto.WXUserAddressDTO;
import com.huashi.entity.WXUserAddress;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.BaseService;
import com.huashi.requestVO.WXUserAddressRequestVO;
import com.huashi.requestVO.searchRequestVO.WXUserAddressSearchRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface WXUserAddressService extends BaseService<WXUserAddress, WXUserAddressDTO, Long> {

    public PaginatorResult<WXUserAddressDTO> findWXUserAddress(WXUserAddressSearchRequestVO requestVO, PaginatorRequest pr);

    public void saveOrUpdate(WXUserAddressRequestVO requsetVO);

    public void del(Long id);
}
