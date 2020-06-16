package com.huashi.framework.core.servlet;

import org.apache.commons.collections.CollectionUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * http响应工具类
 *
 * @author xishengchun on 2017-11-20.
 */
public final class ResponseUtils {

    private final static String DEFAULT_ALLOW_HEADERS = "X-Requested-With, Content-Type, X-operatorId, X-AuthToken, X-appName, X-ClientOS";

    private ResponseUtils() {
        throw new UnsupportedOperationException("cannot be instantiated");
    }

    /**
     * 响应内容
     *
     * @param response
     * @param value
     * @throws IOException
     */
    public static void response(HttpServletResponse response, String value) {
        PrintWriter writer = null;
        try {
            writer = response.getWriter();
            writer.write(value);
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }


    }

    /**
     * 响应内容
     *
     * @param response
     * @param value
     * @throws IOException
     */
    public static void responseJson(HttpServletResponse response, String value) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        response(response,value);
    }

    /**
     * 设置跨域参数
     *
     * @param response
     * @param request
     */
    public static void setCrossAllow(HttpServletResponse response, HttpServletRequest request, List<String> accessCtrlAllowHeaders) {
        String origin = request.getHeader("Origin");
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");

        String allowHeader = DEFAULT_ALLOW_HEADERS;
        if (CollectionUtils.isNotEmpty(accessCtrlAllowHeaders)) {
            allowHeader = allowHeader + ", " + accessCtrlAllowHeaders.stream().collect(Collectors.joining(", "));
        }
        response.setHeader("Access-Control-Allow-Headers", allowHeader);
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    /**
     * 设置导出excel的相关参数
     *
     * @param response
     * @param fileName
     * @throws UnsupportedEncodingException
     */
    public static void setExcelContentType(HttpServletResponse response, String fileName) throws UnsupportedEncodingException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/vnd.ms-excel;charset=utf-8");
        response.setHeader("Content-Disposition", "attachment;filename=" + new String((fileName + ".xls").getBytes(), "iso-8859-1"));
    }

}
