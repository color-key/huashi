package com.huashi.service.impl;

import com.huashi.converter.WXUserConverter;
import com.huashi.dao.WXUserDAO;
import com.huashi.dto.WXUserDTO;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.service.WXUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class WXUserServiceImpl extends BaseServiceImpl<WXUser, WXUserDTO, Long, WXUserConverter, WXUserDAO> implements WXUserService {

}
