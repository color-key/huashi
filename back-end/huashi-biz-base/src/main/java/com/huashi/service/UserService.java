package com.huashi.service;

import com.huashi.dto.UserDTO;
import com.huashi.entity.User;
import com.huashi.framework.core.service.BaseService;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public interface UserService extends BaseService<User, UserDTO, Long> {

    public User login(String loginName, String password);
}
