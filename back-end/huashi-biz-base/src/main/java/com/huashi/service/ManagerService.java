package com.huashi.service;

import com.huashi.dto.ManagerDTO;
import com.huashi.entity.Manager;
import com.huashi.framework.core.service.BaseService;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public interface ManagerService extends BaseService<Manager, ManagerDTO, Long> {

    public Manager login(String loginName, String password);
}
