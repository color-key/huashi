package com.huashi.dao.plus.impl;

import com.huashi.dao.plus.OrderDAOPlus;
import com.huashi.entity.WXOrder;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.dao.impl.BaseDAOImpl;
import com.huashi.framework.core.enumeration.DaySymbolEnum;
import com.huashi.framework.core.utils.DatetimeUtil;
import com.huashi.requestVO.searchRequestVO.OrderSearchRequestVO;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class OrderDAOImpl extends BaseDAOImpl implements OrderDAOPlus {

    @Override
    public PaginatorResult<WXOrder> findOrder(OrderSearchRequestVO requestVO, PaginatorRequest pr) {
        StringBuilder sb = new StringBuilder("from WXOrder vxo WHERE 1=1")
                .append(" AND vxo.activeFlag = 1 AND vxo.deletedFlag = 0 ")
                .append(" {AND {vxo.openId = :openId}}")
                .append(" {AND ({vxo.orderNo like :keyword} OR {vxo.userName like :keyword})}")
                .append(" {AND {vxo.creationDatetime >= :startDate}}")
                .append(" {AND {vxo.creationDatetime <= :endDate}}");

        Map<String, Object> params = new HashMap<String, Object>();

        if(StringUtils.isNotBlank(requestVO.getOpenId())){
            params.put("openId", requestVO.getOpenId());
        }
        if(StringUtils.isNotBlank(requestVO.getKeyword())){
            params.put("keyword", "%" + requestVO.getKeyword() + "%");
        }
        if(StringUtils.isNotBlank(requestVO.getStartDate())){
            params.put("startDate", DatetimeUtil.toDate(requestVO.getStartDate() + DaySymbolEnum.START.value()));
        }
        if(StringUtils.isNotBlank(requestVO.getEndDate())){
            params.put("endDate", DatetimeUtil.toDate(requestVO.getEndDate() + DaySymbolEnum.END.value()));
        }

        Query query = buildQuery(sb, params, pr, false);
        Query countQuery = buildQuery(sb, params,false);

        PaginatorResult<WXOrder> presult = new PaginatorResult<>(query.getResultList(), countQuery.getResultList().size(), pr);
        return presult;
    }
}
