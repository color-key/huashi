package com.huashi.dao;

import com.huashi.dao.plus.LogisticsInfoDAOPlus;
import com.huashi.entity.LogisticsInfo;
import com.huashi.framework.core.dao.BaseDAO;
import org.springframework.stereotype.Repository;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Repository
public interface LogisticsInfoDAO extends BaseDAO<LogisticsInfo, Long>, LogisticsInfoDAOPlus {

}
