package com.huashi.framework.core.servlet;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

/**
 * @author xishengchun on 2017-11-20.
 * servlet request tool
 */
public final class RequestUtils {

    private static final String NGINX_X_FORWARDED_FOR = "X-Forwarded-For";
    private static final String NGINX_IP_HEADER = "X-Real-IP";
    private static final String HEADER_UNKNOW = "unknown";

    private RequestUtils() {
        throw new UnsupportedOperationException("cannot be instantiated");
    }

    public static String getRemoteIp(HttpServletRequest request) {
        return getRequestIp(request);
    }

    public static String getRemoteIp() {
        return getRequestIp(getRequest());
    }

    public static String getRequestIp(HttpServletRequest request) {
        String ip = request.getHeader(NGINX_IP_HEADER);
        if (ip == null || ip.length() == 0 || HEADER_UNKNOW.equalsIgnoreCase(ip)) {
            ip = request.getHeader(NGINX_X_FORWARDED_FOR);
        }
        if (ip == null || ip.length() == 0 || HEADER_UNKNOW.equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || HEADER_UNKNOW.equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || HEADER_UNKNOW.equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (StringUtils.isNotEmpty(ip) && ip.lastIndexOf(",") != -1) {
            int startIndex = ip.lastIndexOf(",") + 1;
            ip = ip.substring(startIndex).trim();
        }
        return ip;
    }

    public static String getRequestIp() {
        return getRequestIp(getRequest());
    }

    /**
     * 获取请求头
     *
     * @param request
     * @return
     */
    public static String getHeader(HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        StringBuffer headerBuffer = new StringBuffer();
        headerBuffer.append("{");
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            headerBuffer.append(headerName).append(":").append(headerValue).append(",");
        }
        headerBuffer.append("}");
        return headerBuffer.toString();
    }

    public static String getHeader() {
        return getHeader(getRequest());
    }

    public static String getHeader(HttpServletRequest request, String headerName) {
        if (StringUtils.isBlank(headerName)) {
            return StringUtils.EMPTY;
        }
        return request.getHeader(headerName);
    }

    public static String getHeader(String headerName) {
        return getHeader(getRequest(), headerName);
    }

    public static String getMethod(HttpServletRequest request) {
        return request.getMethod();
    }

    public static String getMethod() {
        return getMethod(getRequest());
    }

    /**
     * 获取请求参数
     *
     * @param request
     * @return
     */
    public static String getParam(HttpServletRequest request) {
        StringBuffer paramBuffer = new StringBuffer();
        paramBuffer.append("{");
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String paramName = parameterNames.nextElement();
            String paramValue = request.getParameter(paramName);
            paramBuffer.append(paramName).append(":").append(paramValue).append(",");
        }
        paramBuffer.append("}");
        return paramBuffer.toString();
    }

    public static String getParam() {
        return getParam(getRequest());
    }

    /**
     * 获取地址
     *
     * @param request
     * @return
     */
    public static String getUri(HttpServletRequest request) {
        if (request == null) {
            return StringUtils.EMPTY;
        }
        return request.getRequestURI();
    }

    public static String getUri() {
        return getUri(getRequest());
    }

    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

}
