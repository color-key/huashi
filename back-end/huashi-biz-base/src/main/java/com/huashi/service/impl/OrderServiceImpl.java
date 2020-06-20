package com.huashi.service.impl;

import com.huashi.converter.OrderConverter;
import com.huashi.dao.OrderDAO;
import com.huashi.dto.OrderDTO;
import com.huashi.entity.WXOrder;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class OrderServiceImpl extends BaseServiceImpl<WXOrder, OrderDTO, Long, OrderConverter, OrderDAO> implements OrderService {

}
