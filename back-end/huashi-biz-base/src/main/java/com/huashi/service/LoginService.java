package com.huashi.service;

import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/14.
 */
public interface LoginService {

    Map<String, String> login(String userName, String password);

}
