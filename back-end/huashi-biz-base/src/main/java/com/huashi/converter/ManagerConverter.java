package com.huashi.converter;

import com.huashi.dto.ManagerDTO;
import com.huashi.entity.Manager;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Component
public class ManagerConverter extends BaseConverter<Manager, ManagerDTO, Long> {
    @Override
    public ManagerDTO toDTO(Manager user) {
        if(user == null){
            return null;
        }
        ManagerDTO dto = new ManagerDTO();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setUsername(user.getUsername());
        dto.setMobile(user.getMobile());
        dto.setPassword(user.getPassword());
        dto.setActiveFlag(user.getActiveFlag());
        dto.setDeletedFlag(user.getDeletedFlag());
        dto.setCreationDatetime(user.getCreationDatetime());
        dto.setUpdateDatetime(user.getUpdateDatetime());

        return dto;
    }
}
