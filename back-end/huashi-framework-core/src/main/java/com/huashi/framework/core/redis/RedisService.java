package com.huashi.framework.core.redis;

import com.alibaba.fastjson.JSON;
import com.huashi.framework.core.code.ResponseEnum;
import com.huashi.framework.core.exception.RdException;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created  on 2019/7/10.
 *
 * @author chiang
 */
@Service
public class RedisService {

    private Logger logger = LogManager.getLogger(RedisService.class);

    @Autowired
    private RedisTemplate<String, String> redisTemplate;


    public void set(String key, String value, boolean throwException) {
        try {
            redisTemplate.opsForValue().set(key, value);
        } catch (Exception e) {
            //不影响业务
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Write Redis ERROR"));
            }
            logger.error("write redis error", e);
        }
    }

    public void set(String key, String value) {
        set(key, value, false);
    }

    public <T> void setObject(String key, T value, boolean throwException) {
        if (value == null) {
            return;
        }
        String json = JSON.toJSONString(value);
        set(key, json, throwException);
    }

    public <T> void setObject(String key, T value) {
        if (value == null) {
            return;
        }
        setObject(key, value, false);
    }

    public String get(String key, boolean throwException) {
        String value = StringUtils.EMPTY;
        try {
            value = redisTemplate.opsForValue().get(key);
        } catch (Exception e) {
            //不影响业务
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Read Redis ERROR"));
            }
            logger.error("read redis error", e);
        }
        return value;
    }

    public String get(String key) {
        return get(key, false);
    }

    public <T> T get(String key, Class<T> cls) {
        return get(key, false, cls);
    }

    public <T> T get(String key, boolean throwException, Class<T> cls) {
        String json = get(key, throwException);
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        return JSON.parseObject(json, cls);
    }


    public <T> void setObject(String key, T value, long timeout, boolean throwException) {
        if (value == null) {
            return;
        }

        String json = "";
        if(value instanceof String) {
            json = String.valueOf(value);
        }else {
            json = JSON.toJSONString(value);
        }

        try {
            redisTemplate.opsForValue().set(key, json, timeout, TimeUnit.SECONDS);
        } catch (Exception e) {
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Write Redis ERROR"));
            }
            logger.error("write redis error", e);
        }
    }

    public <T> void setObject(String key, T value, long timeout) {
        if (value == null) {
            return;
        }
        setObject(key, value, timeout, false);
    }

    public void expire(String key, long timeout) {
        redisTemplate.expire(key, timeout, TimeUnit.SECONDS);
    }

    public void expireAt(String key, Date expireAt) {
        redisTemplate.expireAt(key, expireAt);
    }

    /**
     * 根据key清空缓存内容
     *
     * @param key
     */
    public void delete(String key) {
        if (redisTemplate.hasKey(key)) {
            redisTemplate.delete(key);
        }
    }


    public void put(String h,String hk, String value, boolean throwException) {
        try {
            redisTemplate.opsForHash().put(h,hk, value);
        } catch (Exception e) {
            //不影响业务
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Write Redis ERROR"));
            }
            logger.error("write redis error", e);
        }
    }

    public void put(String h,String hk, String value) {
        put(h,hk, value, false);
    }

    public void put(String h, Map values, boolean throwException) {
        try {
            redisTemplate.opsForHash().putAll(h,values);
        } catch (Exception e) {
            //不影响业务
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Write Redis ERROR"));
            }
            logger.error("write redis error", e);
        }
    }
    public void put(String h, Map values) {
        put(h, values, false);
    }

    public Object getFromMap(String h,String hk, boolean throwException) {
        Object value = null;
        try {
            value = redisTemplate.opsForHash().get(h,hk);
        } catch (Exception e) {
            //不影响业务
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Read Redis ERROR"));
            }
            logger.error("read redis error", e);
        }
        return value;
    }

    public Object getFromMap(String h,String hk) {
        return getFromMap(h,hk, false);
    }

    public Map getMap(String h,boolean throwException) {
        Map map = null;
        try {
            map = redisTemplate.opsForHash().entries(h);
        } catch (Exception e) {
            //不影响业务
            if (throwException) {
                throw new RdException(ResponseEnum.FAIL.desc("Read Redis ERROR"));
            }
            logger.error("read redis error", e);
        }
        return map;
    }

    public Map getMap(String h) {
       return getMap(h,false);
    }

    public boolean exist(String key) {
       return redisTemplate.hasKey(key);
    }
}
