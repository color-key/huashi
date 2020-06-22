package com.huashi.dao.plus.impl;

import com.huashi.dao.plus.WXUserAddressDAOPlus;
import com.huashi.entity.WXUserAddress;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.dao.impl.BaseDAOImpl;
import com.huashi.requestVO.searchRequestVO.WXUserAddressSearchRequestVO;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class WXUserAddressDAOImpl extends BaseDAOImpl implements WXUserAddressDAOPlus {

    @Override
    public PaginatorResult<WXUserAddress> findWXUserAddress(WXUserAddressSearchRequestVO requestVO, PaginatorRequest pr) {
        StringBuilder sb = new StringBuilder("from WXUserAddress ua WHERE 1=1")
                .append(" AND ua.activeFlag = 1 AND ua.deletedFlag = 0 ")
                .append(" {AND {ua.openId = :openId}}");
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("openId", requestVO.getOpenId());

        Query query = buildQuery(sb, params, pr, false);
        Query countQuery = buildQuery(sb, params,false);

        PaginatorResult<WXUserAddress> presult = new PaginatorResult<>(query.getResultList(), countQuery.getResultList().size(), pr);
        return presult;
    }
}
