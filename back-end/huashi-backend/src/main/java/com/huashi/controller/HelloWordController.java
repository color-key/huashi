package com.huashi.controller;

import com.huashi.dto.UserDTO;
import com.huashi.entity.HelloWord;
import com.huashi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author xiaoyu
 * @data 2020/5/18.
 */
@RestController
public class HelloWordController {

    @Autowired
    private UserService userService;

    @RequestMapping("/say")
    public String say(){
        return "hello word";
    }

    @RequestMapping("/hello")
    public HelloWord hello(){
        HelloWord h = new HelloWord();
        h.setName("李雷");
        h.setBirthday("198902185413");

        return h;
    }

    @RequestMapping("/find")
    public UserDTO find(final HttpServletRequest request){
        UserDTO dto = userService.findOne(1L);

        return dto;
    }






}
