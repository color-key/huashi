package com.huashi.service.impl;

import com.huashi.converter.ManagerConverter;
import com.huashi.dao.ManagerDAO;
import com.huashi.dto.ManagerDTO;
import com.huashi.entity.Manager;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.service.ManagerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
@Service
@Transactional
public class ManagerServiceImpl extends BaseServiceImpl<Manager, ManagerDTO, Long, ManagerConverter, ManagerDAO> implements ManagerService {

    @Override
    public Manager login(String loginName, String password) {
        return getDAO().login(loginName, password);
    }
}
