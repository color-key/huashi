package com.huashi.framework.core.redis;

import org.apache.commons.lang3.StringUtils;

/**
 * @author xiaoyu
 * @data 2020/6/14.
 */
public class RedisKeyConstant {
    public static final String CUSTOMER_KEY_PREFIX = "customer:";
    public static final String FY_PREFIX = "fy:";

    /**
     * 生成key
     *
     * @param keyPrefix
     * @param keyPart
     * @return
     */
    public static final String getCacheKey(String keyPrefix, String... keyPart) {
        return keyPrefix + StringUtils.join(keyPart, ":");
    }
}
