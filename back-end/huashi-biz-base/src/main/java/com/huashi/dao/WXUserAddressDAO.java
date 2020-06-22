package com.huashi.dao;

import com.huashi.dao.plus.WXUserAddressDAOPlus;
import com.huashi.entity.WXUserAddress;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Repository
public interface WXUserAddressDAO  extends BaseDAO<WXUserAddress, Long>, WXUserAddressDAOPlus {

}
