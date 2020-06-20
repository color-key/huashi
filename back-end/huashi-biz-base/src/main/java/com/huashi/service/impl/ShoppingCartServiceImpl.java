package com.huashi.service.impl;

import com.huashi.converter.ShoppingCartConverter;
import com.huashi.dao.ShoppingCartDAO;
import com.huashi.dto.ShoppingCartDTO;
import com.huashi.entity.ShoppingCart;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.requestVO.ShoppingCartRequestVO;
import com.huashi.requestVO.searchRequestVO.ShoppingCartSearchRequestVO;
import com.huashi.service.ShoppingCartService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class ShoppingCartServiceImpl extends BaseServiceImpl<ShoppingCart, ShoppingCartDTO, Long, ShoppingCartConverter, ShoppingCartDAO> implements ShoppingCartService {

    @Override
    public PaginatorResult<ShoppingCartDTO> findShoppingCart(ShoppingCartSearchRequestVO requestVO, PaginatorRequest pr) {
        PaginatorResult<ShoppingCart> pResult = getDAO().findShoppingCart(requestVO, pr);
        PaginatorResult<ShoppingCartDTO> result = new PaginatorResult<>(getConverter().toDTOList(pResult.getRecords()), pResult.getCount(), pResult.getTotalPages());
        return result;
    }

    @Override
    public void saveOrUpdate(ShoppingCartRequestVO requsetVO) {
        ShoppingCart cart = null;
        if(requsetVO.getId() == null){
            cart = new ShoppingCart();
            cart.setWxUserId(requsetVO.getWxUserId());
        } else {
            cart = get(requsetVO.getId());
        }

        cart.setName(requsetVO.getName());
        cart.setGender(requsetVO.getGender());
        cart.setMobile(requsetVO.getMobile());
        cart.setFrameModel(requsetVO.getFrameModel());
        cart.setInterpupillaryDistance(requsetVO.getInterpupillaryDistance());
        cart.setCylMirrorRight(requsetVO.getCylMirrorRight());
        cart.setPrismRight(requsetVO.getPrismRight());
        cart.setAxialRight(requsetVO.getAxialRight());
        cart.setPointPupilRight(requsetVO.getPointPupilRight());
        cart.setCylMirrorLeft(requsetVO.getCylMirrorLeft());
        cart.setPrismLeft(requsetVO.getPrismLeft());
        cart.setAxialLeft(requsetVO.getAxialLeft());
        cart.setPointPupilLeft(requsetVO.getPointPupilLeft());
        saveOrUpdate(cart);
    }

    @Override
    public void update(String orderNo, String cartIds) {
        if(StringUtils.isBlank(cartIds) || StringUtils.isBlank(orderNo)){
            return;
        }

        String[] cartArray = cartIds.split(",");
        for(String id : cartArray){
            ShoppingCart cart = get(Long.valueOf(id));
            cart.setOrderNo(orderNo);
            saveOrUpdate(cart);
        }
    }

    @Override
    public void del(Long id) {
        ShoppingCart cart = get(id);
        cart.setDeletedFlag(true);
        saveOrUpdate(cart);
    }

    @Override
    public List<ShoppingCartDTO> findByOrderNo(String orderNo) {
        return getDAO().findByOrderNo(orderNo);
    }

}
