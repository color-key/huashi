package com.huashi.requestVO.searchRequestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/21.
 */
public class WXUserSearchRequestVO extends BaseRequestVO {
    private static final long serialVersionUID = 1510437707330207240L;

    /**
     * 模糊查询关键字(订单、客户)
     */
    private String keyword;
    /**
     * 下单时间范围
     */
    private String startDate;
    /**
     * 下单时间范围
     */
    private String endDate;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
