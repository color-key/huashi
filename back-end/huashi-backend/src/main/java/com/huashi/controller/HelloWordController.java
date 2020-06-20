package com.huashi.controller;

import com.huashi.dto.ManagerDTO;
import com.huashi.entity.HelloWord;
import com.huashi.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author xiaoyu
 * @data 2020/5/18.
 */
@RestController
@RequestMapping(value = "test")
public class HelloWordController {

    @Autowired
    private ManagerService managerService;

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
    public ManagerDTO find(final HttpServletRequest request){
        ManagerDTO dto = managerService.findOne(1L);

        return dto;
    }






}
