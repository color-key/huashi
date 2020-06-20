package com.huashi.dao.plus.impl;

import com.huashi.dao.plus.WXUserDAOPlus;
import com.huashi.entity.WXUser;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.dao.impl.BaseDAOImpl;
import com.huashi.framework.core.enumeration.DaySymbolEnum;
import com.huashi.framework.core.utils.DatetimeUtil;
import com.huashi.requestVO.searchRequestVO.WXUserSearchRequestVO;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class WXUserDAOImpl extends BaseDAOImpl implements WXUserDAOPlus {
    @Override
    public PaginatorResult<WXUser> findWXUser(WXUserSearchRequestVO requestVO, PaginatorRequest pr) {
        StringBuilder sb = new StringBuilder("from WXUser user WHERE 1=1")
                .append(" AND user.activeFlag = 1 AND user.deletedFlag = 0 ")
                .append(" {AND {user.name like :keyword}}")
                .append(" {AND {user.creationDatetime >= :startDate}}")
                .append(" {AND {user.creationDatetime <= :endDate}}");

        Map<String, Object> params = new HashMap<String, Object>();
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

        PaginatorResult<WXUser> presult = new PaginatorResult<>(query.getResultList(), countQuery.getResultList().size(), pr);
        return presult;
    }
}
