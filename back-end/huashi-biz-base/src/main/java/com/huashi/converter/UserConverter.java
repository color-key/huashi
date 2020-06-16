package com.huashi.converter;

import com.huashi.dto.UserDTO;
import com.huashi.entity.User;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Component
public class UserConverter extends BaseConverter<User, UserDTO, Long> {
    @Override
    public UserDTO toDTO(User user) {
        if(user == null){
            return null;
        }
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setNickname(user.getNickname());
        dto.setFullName(user.getFullName());
        dto.setName(user.getName());
        dto.setMobile(user.getMobile());
        dto.setMailbox(user.getMailbox());
        dto.setPassword(user.getPassword());
        dto.setRoleId(user.getRoleId());
        dto.setMFA(user.getMFA());
        dto.setLastLoginIP(user.getLastLoginIP());
        dto.setLastLoginTime(user.getLastLoginTime());
        dto.setActiveFlag(user.getActiveFlag());
        dto.setDeletedFlag(user.getDeletedFlag());
        dto.setCreationDatetime(user.getCreationDatetime());
        dto.setUpdateDatetime(user.getUpdateDatetime());

        return dto;
    }
}
