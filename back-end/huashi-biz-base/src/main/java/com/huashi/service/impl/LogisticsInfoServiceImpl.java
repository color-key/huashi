package com.huashi.service.impl;

import com.huashi.converter.LogisticsInfoConverter;
import com.huashi.dao.LogisticsInfoDAO;
import com.huashi.dto.LogisticsInfoDTO;
import com.huashi.entity.LogisticsInfo;
import com.huashi.framework.core.service.impl.BaseServiceImpl;
import com.huashi.requestVO.LogisticsInfoRequestVO;
import com.huashi.service.LogisticsInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Service
@Transactional
public class LogisticsInfoServiceImpl extends BaseServiceImpl<LogisticsInfo, LogisticsInfoDTO, Long, LogisticsInfoConverter, LogisticsInfoDAO> implements LogisticsInfoService {
    @Override
    public void saveOrUpdate(LogisticsInfoRequestVO requsetVO) {
        LogisticsInfo li = null;
        if(requsetVO.getId() == null){
            li = new LogisticsInfo();
            li.setOrderNo(requsetVO.getOrderNo());
        } else {
            li = get(requsetVO.getId());
        }
        li.setLogisticsNo(requsetVO.getLogisticsNo());
        li.setOpenId(requsetVO.getOpenId());
        li.setAddress(requsetVO.getAddress());
        li.setContactPerson(requsetVO.getContactPerson());
        li.setContactMobile(requsetVO.getContactMobile());

        saveOrUpdate(li);
    }

    @Override
    public void del(Long id) {
        LogisticsInfo li = get(id);
        li.setDeletedFlag(true);
        saveOrUpdate(li);
    }

    @Override
    public LogisticsInfoDTO findByOrderNo(String orderNo) {
        return getConverter().toDTO(getDAO().findByOrderNo(orderNo));
    }

    @Override
    public List<LogisticsInfoDTO> findByOpenId(String openId) {
        return getConverter().toDTOList(getDAO().findByOpenId(openId));
    }
}
