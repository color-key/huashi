package com.huashi.service.impl;

import com.huashi.converter.WXUserConverter;
import com.huashi.dao.WXUserDAO;
import com.huashi.dto.WXUserDTO;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.requestVO.WXUserRequestVO;
import com.huashi.requestVO.searchRequestVO.WXUserSearchRequestVO;
import com.huashi.service.WXUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class WXUserServiceImpl extends BaseServiceImpl<WXUser, WXUserDTO, Long, WXUserConverter, WXUserDAO> implements WXUserService {

    @Override
    public PaginatorResult<WXUserDTO> findWXUser(WXUserSearchRequestVO requestVO, PaginatorRequest pr) {
        PaginatorResult<WXUser> pResult = getDAO().findWXUser(requestVO, pr);
        PaginatorResult<WXUserDTO> result = new PaginatorResult<>(getConverter().toDTOList(pResult.getRecords()), pResult.getCount(), pResult.getTotalPages());
        return result;
    }

    @Override
    public WXUser saveOrUpdate(WXUserRequestVO requsetVO) {
        WXUser user = null;
        if (requsetVO.getId() == null){
            user = new WXUser();
            user.setLoginId(requsetVO.getLoginId());
            user.setOpenId(requsetVO.getOpenId());
            user.setName(requsetVO.getName());
            user.setMobile(requsetVO.getMobile());
            user.setStore(requsetVO.getStore());
            user.setStore(requsetVO.getStore());
            user.setRemark(requsetVO.getRemark());
        } else {
            user = get(requsetVO.getId());
        }

        user.setStatus(requsetVO.getStatus());
        return saveOrUpdate(user);
    }
}
