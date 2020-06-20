package com.huashi.requestVO.searchRequestVO;

import com.huashi.framework.core.requestVO.BaseRequestVO;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
public class WXUserAddressSearchRequestVO extends BaseRequestVO {
    private static final long serialVersionUID = -6755439586079327181L;

    /**
     * 用户openId
     */
    private String openId;

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

}
