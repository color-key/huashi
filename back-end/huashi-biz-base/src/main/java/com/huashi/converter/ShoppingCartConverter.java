package com.huashi.converter;

import com.huashi.dto.ShoppingCartDTO;
import com.huashi.entity.ShoppingCart;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class ShoppingCartConverter extends BaseConverter<ShoppingCart, ShoppingCartDTO, Long> {
    @Override
    public ShoppingCartDTO toDTO(ShoppingCart entity) {
        if(entity == null){
            return null;
        }
        ShoppingCartDTO dto = new ShoppingCartDTO();
        dto.setId(entity.getId());
        dto.setWxUserId(entity.getWxUserId());
        dto.setOrderNo(entity.getOrderNo());
        dto.setName(entity.getName());
        dto.setGender(entity.getGender());
        dto.setGenderStr(entity.getGender() == 0 ? "男":"女");
        dto.setMobile(entity.getMobile());
        dto.setFrameModel(entity.getFrameModel());
        dto.setInterpupillaryDistance(entity.getInterpupillaryDistance());
        dto.setCylMirrorRight(entity.getCylMirrorRight());
        dto.setPrismRight(entity.getPrismRight());
        dto.setAxialRight(entity.getAxialRight());
        dto.setPointPupilRight(entity.getPointPupilRight());
        dto.setCylMirrorLeft(entity.getCylMirrorLeft());
        dto.setPrismLeft(entity.getPrismLeft());
        dto.setAxialLeft(entity.getAxialLeft());
        dto.setPointPupilLeft(entity.getPointPupilLeft());

        return dto;
    }
}
