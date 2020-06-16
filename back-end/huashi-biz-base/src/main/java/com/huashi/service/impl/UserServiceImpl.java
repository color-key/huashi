package com.huashi.service.impl;

import com.huashi.converter.UserConverter;
import com.huashi.dao.UserDAO;
import com.huashi.dto.UserDTO;
import com.huashi.entity.User;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Service
@Transactional
public class UserServiceImpl extends BaseServiceImpl<User, UserDTO, Long, UserConverter, UserDAO> implements UserService {

    @Override
    public User login(String loginName, String password) {
        return getDAO().login(loginName, password);
//        return getDAO().findById(1L);
    }
}
