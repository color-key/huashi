package com.huashi.service.impl;

import com.huashi.entity.User;
import com.huashi.framework.core.redis.RedisKeyConstant;
import com.huashi.framework.core.redis.RedisService;
import com.huashi.service.LoginService;
import com.huashi.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ContextedRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * @author xiaoyu
 * @data 2020/6/14.
 */
@Service
@Transactional
public class LoginServiceimpl implements LoginService {

    private static final int EXPIRE_TIME_OUT = 24 * 60 * 60;

    @Resource
    private RedisService redisService;

    @Autowired
    private UserService userService;

    @Override
    public Map<String, String> login(String userName, String password) {
        if (StringUtils.isBlank(userName)) {
            throw new ContextedRuntimeException("登录名不能为空");
        }

        if (StringUtils.isBlank(password)) {
            throw new ContextedRuntimeException("密码不能为空");
        }

        User user = userService.login(userName, password);

        if (user == null) {
            throw new ContextedRuntimeException("登录用户名不存在或者密码错误");
        }
        // 生成token
        String token = uuid();
        redisService.setObject(RedisKeyConstant.CUSTOMER_KEY_PREFIX + "token:" + token, user, EXPIRE_TIME_OUT);

        Map<String, String> param = new HashMap<>();
        param.put("id", user.getId().toString());
        param.put("name", user.getName());
        param.put("mobile", user.getMobile());
        param.put("token", token);

        return param;
    }

    /**
     * 生成随机的UUID字符串
     *
     * @return
     */
    public static String uuid() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
