package com.huashi.framework.core.controller;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/20.
 */
@Controller
public class BaseController {

    protected Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * Build a success result with a message.
     * @return AppResult
     */
    public AppResult success(String message) {
        return new AppResult(AppResult.RETURN_SUCCESS, AppResult.SUCCESS, message);
    }

    public AppResult success(String code, String message) {
        return new AppResult(code, AppResult.SUCCESS, message);
    }

    /**
     * Build a failed result with a message.
     *
     * @return AppResult
     */
    public AppResult failed(String message) {
        return new AppResult(AppResult.RETURN_FAIL, AppResult.FAILED, message);
    }

    public AppResult failed(String code, String message) {
        return new AppResult(code, AppResult.FAILED, message);
    }

    public Object buildRequestVO(Object object, HttpServletRequest request) {
        Map<String, String[]> paramsMap = request.getParameterMap();
        Method[] methods = object.getClass().getDeclaredMethods();
        for (Method method : methods) {
            if (method.getName().indexOf("set") == 0) {
                Class<?> clazz = method.getParameterTypes()[0];
                String property = method.getName().substring(3, method.getName().length());
                property = property.substring(0, 1).toLowerCase() + property.substring(1);
                if (paramsMap.containsKey(property)) {
                    try {
                        String value = paramsMap.get(property)[0];
                        if(StringUtils.isNotBlank(value)){
                            if(clazz.getSimpleName().equals("Integer")){
                                method.invoke(object, Integer.valueOf(value));

                            }else if(clazz.getSimpleName().equals("Long")){
                                method.invoke(object, Long.valueOf(value));

                            }else if(clazz.getSimpleName().equals("Float")){
                                method.invoke(object, Float.valueOf(value));

                            }else if(clazz.getSimpleName().equals("Double")){
                                method.invoke(object, Double.valueOf(value));

                            }else if(clazz.getSimpleName().equals("Short")){
                                method.invoke(object, Short.valueOf(value));

                            }else if(clazz.getSimpleName().equals("Boolean")){
                                method.invoke(object, Boolean.valueOf(value));

                            }else if(clazz.getSimpleName().equals("String")){
                                method.invoke(object, URLDecoder.decode(value, "utf-8"));
                                //method.invoke(object, value);
                            }
                        }else{
                            method.invoke(object, "");
                        }
                    } catch (Exception e) {
                    }
                }
            }
        }
        return object;
    }
}
