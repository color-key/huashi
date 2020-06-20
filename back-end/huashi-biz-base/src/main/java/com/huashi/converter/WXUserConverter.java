package com.huashi.converter;

import com.huashi.dto.WXUserDTO;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class WXUserConverter extends BaseConverter<WXUser, WXUserDTO, Long> {
    @Override
    public WXUserDTO toDTO(WXUser entity) {
        if(entity == null){
            return null;
        }
        WXUserDTO dto = new WXUserDTO();
        dto.setLoginId(entity.getLoginId());
        dto.setOpenId(entity.getOpenId());
        dto.setPassword(entity.getPassword());
        dto.setName(entity.getName());
        dto.setMobile(entity.getMobile());
        dto.setStore(entity.getStore());
        dto.setStatus(entity.getStatus());

        return dto;
    }
}
