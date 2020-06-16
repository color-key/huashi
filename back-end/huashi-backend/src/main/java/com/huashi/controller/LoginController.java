package com.huashi.controller;

import com.huashi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/14.
 */
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public Map<String, String> login(String loginName, String password){
        Map<String, String> result = loginService.login(loginName, password);

        return result;
    }
}
