package com.huashi.service;

import com.huashi.dto.LogisticsInfoDTO;
import com.huashi.entity.LogisticsInfo;
import com.huashi.framework.core.service.BaseService;
import com.huashi.requestVO.LogisticsInfoRequestVO;

import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public interface LogisticsInfoService extends BaseService<LogisticsInfo, LogisticsInfoDTO, Long> {

    void saveOrUpdate(LogisticsInfoRequestVO requsetVO);

    void del(Long id);

    LogisticsInfoDTO findByOrderNo(String orderNo);

    List<LogisticsInfoDTO> findByOpenId(String openId);
}
