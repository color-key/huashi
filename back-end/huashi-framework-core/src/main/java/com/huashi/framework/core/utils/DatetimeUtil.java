package com.huashi.framework.core.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author xiaoyu
 * @data 2020/5/31.
 */
public class DatetimeUtil {
    public final static String FORMAT1 = "yyyy-MM-dd HH:mm:ss";
    public final static String FORMAT2 = "yyyy-MM-dd";
    public final static String FORMAT3 = "yyyyMMddHHmmss";

    public static String toString(Date date) {
        try {
            DateFormat format = new SimpleDateFormat(FORMAT1);
            return format.format(date);
        } catch (Exception e) {
            return "Error Date";
        }
    }

    public static String toString(Date date, String format) {
        try {
            DateFormat ft = new SimpleDateFormat(format);
            return ft.format(date);
        } catch (Exception e) {
            return "Error Date";
        }
    }

    public static Date toDate(String date, String format) {
        DateFormat ft = new SimpleDateFormat(format);
        try {
            return ft.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Date toDate(String date) {
        DateFormat format = new SimpleDateFormat(FORMAT1);
        try {
            return format.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

}
