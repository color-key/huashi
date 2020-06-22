package com.huashi.converter;

import com.huashi.dto.OrderDTO;
import com.huashi.entity.WXOrder;
import com.huashi.enumeration.OrderStatusEnum;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class OrderConverter extends BaseConverter<WXOrder, OrderDTO, Long> {
    @Override
    public OrderDTO toDTO(WXOrder entity) {
        if(entity == null){
            return null;
        }
        OrderDTO dto = new OrderDTO();
        dto.setId(entity.getId());
        dto.setOrderNo(entity.getOrderNo());
        dto.setOpenId(entity.getOpenId());
        dto.setUserName(entity.getUserName());
        dto.setSuatus(OrderStatusEnum.getName(entity.getSuatus()));
        dto.setFrameModel(entity.getFrameModel());
        dto.setColorNo(entity.getColorNo());
        dto.setRemark(entity.getRemark());

        return dto;
    }
}
