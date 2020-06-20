package com.huashi.controller;

import com.huashi.framework.core.controller.AppResult;
import com.huashi.framework.core.controller.BaseController;
import com.huashi.service.LoginService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author xiaoyu
 * @data 2020/6/14.
 */
@RestController
public class LoginController extends BaseController {
    private Logger logger = LogManager.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public AppResult login(String loginName, String password){
        try {
            Map<String, String> param = loginService.login(loginName, password);
            AppResult result = new AppResult();
            result.setData(param);
            return result;
        } catch (Exception e){
            logger.error("登入失败，请确认账户、密码是否正确", e);
            return failed("登入失败，请确认账户、密码是否正确");
        }

    }
}
