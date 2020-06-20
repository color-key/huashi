package com.huashi.converter;

import com.huashi.dto.LogisticsInfoDTO;
import com.huashi.entity.LogisticsInfo;
import com.huashi.framework.core.converter.BaseConverter;
import org.springframework.stereotype.Component;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Component
public class LogisticsInfoConverter  extends BaseConverter<LogisticsInfo, LogisticsInfoDTO, Long> {
    @Override
    public LogisticsInfoDTO toDTO(LogisticsInfo entity) {
        if(entity == null){
            return null;
        }
        LogisticsInfoDTO dto = new LogisticsInfoDTO();
        dto.setLogisticsNo(entity.getLogisticsNo());
        dto.setOrderNo(entity.getOrderNo());
        dto.setAddress(entity.getAddress());
        dto.setContactPerson(entity.getContactPerson());
        dto.setContactMobile(entity.getContactMobile());

        return dto;
    }
}
