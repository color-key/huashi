package com.huashi.config;

import com.alibaba.fastjson.JSON;
import com.huashi.entity.Manager;
import com.huashi.framework.core.code.ResponseEnum;
import com.huashi.framework.core.redis.RedisKeyConstant;
import com.huashi.framework.core.redis.RedisService;
import com.huashi.framework.core.response.BaseResponse;
import com.huashi.framework.core.servlet.RequestUtils;
import com.huashi.framework.core.servlet.ResponseUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

/**
 * @author xiaoyu
 * @data 2020/6/3.
 */
public class AuthTokenInterceptor extends HandlerInterceptorAdapter {

    private Logger logger = LogManager.getLogger(AuthTokenInterceptor.class);

    private static final String LOCAL_IP = "127.0.0.1";

    private static final List<String> WHITE_URL_LIST = Arrays.asList("/login", "test");

    private static final String AUTH_TOKEN_KEY = "X-AuthToken";

    @Resource
    private RedisService redisService;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.debug("进入拦截器");
        String serverName = request.getServerName();

        // todo 测试阶段默认不拦截
        if (true){
            return true;
        }

        if (LOCAL_IP.equals(serverName)) {
            return true;
        }

        String requestURI = request.getRequestURI();
        for (String whiteURL : WHITE_URL_LIST) {
            if (requestURI.contains(whiteURL)) {
                return true;
            }
        }
        String tokenKey = RequestUtils.getHeader(AUTH_TOKEN_KEY);
        logger.debug("tokenKey:{},url:{},head:{},param:{}",tokenKey, request.getRequestURI(), RequestUtils.getHeader(request), RequestUtils.getParam(request));
        Manager user = redisService.get(RedisKeyConstant.CUSTOMER_KEY_PREFIX + "token:" + tokenKey, Manager.class);

        if (user == null) {
            ResponseUtils.responseJson(response, JSON.toJSONString(BaseResponse.response().code(ResponseEnum.NO_LOGIN)));
            return false;
        }
        return true;
    }

}
