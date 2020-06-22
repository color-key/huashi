package com.huashi.dao.plus.impl;

import com.huashi.dao.plus.ShoppingCartDAOPlus;
import com.huashi.entity.ShoppingCart;
import com.huashi.framework.core.controller.PaginatorRequest;
import com.huashi.framework.core.controller.PaginatorResult;
import com.huashi.framework.core.dao.impl.BaseDAOImpl;
import com.huashi.requestVO.searchRequestVO.ShoppingCartSearchRequestVO;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class ShoppingCartDAOImpl extends BaseDAOImpl implements ShoppingCartDAOPlus {


    @Override
    public PaginatorResult<ShoppingCart> findShoppingCart(ShoppingCartSearchRequestVO requestVO, PaginatorRequest pr) {
        StringBuilder sb = new StringBuilder("from ShoppingCart cart WHERE 1=1")
                .append(" AND cart.activeFlag = 1 AND cart.deletedFlag = 0 ");
        Map<String, Object> params = new HashMap<String, Object>();

        if(StringUtils.isNotBlank(requestVO.getWxUserId())){
            sb.append(" {AND {cart.wxUserId = :wxUserId}}");
            params.put("wxUserId", requestVO.getWxUserId());
        }
        if(requestVO.getHasOrderNo().equals(false)){
            sb.append(" AND cart.orderNo is null}");
        } else if(StringUtils.isNotBlank(requestVO.getOrderNo())){
            sb.append(" {AND {cart.orderNo = :orderNo}}");
            params.put("orderNo", requestVO.getOrderNo());
        }

        Query query = buildQuery(sb, params, pr, false);
        Query countQuery = buildQuery(sb, params,false);

        PaginatorResult<ShoppingCart> presult = new PaginatorResult<>(query.getResultList(), countQuery.getResultList().size(), pr);
        return presult;
    }
}
