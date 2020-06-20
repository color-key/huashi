package com.huashi.converter;

import com.huashi.dto.WXUserAddressDTO;
import com.huashi.entity.WXUserAddress;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class WXUserAddressConverter  extends BaseConverter<WXUserAddress, WXUserAddressDTO, Long> {
    @Override
    public WXUserAddressDTO toDTO(WXUserAddress entity) {
        if (entity == null){
            return null;
        }
        WXUserAddressDTO dto = new WXUserAddressDTO();
        dto.setId(entity.getId());
        dto.setOpenId(entity.getOpenId());
        dto.setAddress(entity.getAddress());
        dto.setContactName(entity.getContactName());
        dto.setContactPhone(entity.getContactPhone());

        return dto;
    }
}
