package com.huashi.service.impl;

import com.huashi.converter.OrderConverter;
import com.huashi.dao.OrderDAO;
import com.huashi.dto.OrderDTO;
import com.huashi.dto.ShoppingCartDTO;
import com.huashi.entity.WXOrder;
import com.huashi.enumeration.OrderStatusEnum;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.framework.core.utils.DatetimeUtil;
import com.huashi.requestVO.OrderRequestVO;
import com.huashi.requestVO.searchRequestVO.OrderSearchRequestVO;
import com.huashi.service.OrderService;
import com.huashi.service.ShoppingCartService;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class OrderServiceImpl extends BaseServiceImpl<WXOrder, OrderDTO, Long, OrderConverter, OrderDAO> implements OrderService {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Override
    public PaginatorResult<OrderDTO> findOrder(OrderSearchRequestVO requestVO, PaginatorRequest pr) {
        PaginatorResult<WXOrder> pResult = getDAO().findOrder(requestVO, pr);

        List<OrderDTO> dtoList = getConverter().toDTOList(pResult.getRecords());
        if(requestVO.getShowShoppingCart()){
            for(OrderDTO dto : dtoList){
                List<ShoppingCartDTO> list = shoppingCartService.findByOrderNo(dto.getOrderNo());
                dto.setScList(list);
            }
        }

        PaginatorResult<OrderDTO> result = new PaginatorResult<>(dtoList, pResult.getCount(), pResult.getTotalPages());
        return result;
    }

    @Override
    public void saveOrUpdate(OrderRequestVO requsetVO) {
        WXOrder order = null;
        if(requsetVO.getId() == null){
            order = new WXOrder();
            order.setOrderNo(getOrderNo());
            order.setOpenId(requsetVO.getOpenId());
            order.setUserName(requsetVO.getUserName());
            order.setSuatus(OrderStatusEnum.UNREVIEWED.getValue());
            order.setFrameModel(requsetVO.getFrameModel());
            order.setColorNo(requsetVO.getColorNo());
            order.setRemark(requsetVO.getRemark());
        } else {
            order = get(requsetVO.getId());
            order.setSuatus(requsetVO.getSuatus());
        }
        saveOrUpdate(order);
        // 更新购物车
        shoppingCartService.update(order.getOrderNo(), requsetVO.getCartIds());
    }

    /**
     * 创建订单编号
     * @return
     */
    private String getOrderNo(){
        return DatetimeUtil.toString(new Date(), DatetimeUtil.FORMAT3) + getRandom(1000, 9999);
    }

    /**
     * 获取指定范围随机数
     * @param min
     * @param max
     * @return
     */
    private int getRandom(int min, int max){
        return min + (int)(Math.random() * ( max - min + 1));
    }
}
