package com.huashi.service.impl;

import com.huashi.converter.WXUserAddressConverter;
import com.huashi.dao.WXUserAddressDAO;
import com.huashi.dto.WXUserAddressDTO;
import com.huashi.entity.WXUserAddress;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.requestVO.WXUserAddressRequestVO;
import com.huashi.requestVO.searchRequestVO.WXUserAddressSearchRequestVO;
import com.huashi.service.WXUserAddressService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class WXUserAddressServiceImpl extends BaseServiceImpl<WXUserAddress, WXUserAddressDTO, Long, WXUserAddressConverter, WXUserAddressDAO> implements WXUserAddressService {
    @Override
    public PaginatorResult<WXUserAddressDTO> findWXUserAddress(WXUserAddressSearchRequestVO requestVO, PaginatorRequest pr) {
        PaginatorResult<WXUserAddress> pResult = getDAO().findWXUserAddress(requestVO, pr);

        PaginatorResult<WXUserAddressDTO> result = new PaginatorResult<>();
        result.setCount(pResult.getCount());
        result.setRecords(getConverter().toDTOList(pResult.getRecords()));
        result.setTotalPages(pResult.getTotalPages());

        return result;
    }

    @Override
    public void saveOrUpdate(WXUserAddressRequestVO requsetVO) {
        WXUserAddress address = null;
        if (requsetVO.getId() == null){
            address = new WXUserAddress();
            address.setOpenId(requsetVO.getOpenId());
        } else {
            address = get(requsetVO.getId());
        }

        address.setContactName(requsetVO.getContactName());
        address.setContactPhone(requsetVO.getContactPhone());
        address.setAddress(requsetVO.getAddress());

        saveOrUpdate(address);
    }

    @Override
    public void del(Long id) {
        WXUserAddress address = get(id);
        address.setDeletedFlag(true);
        saveOrUpdate(address);
    }
}
