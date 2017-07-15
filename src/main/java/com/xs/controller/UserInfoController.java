package com.xs.controller;

import com.xs.service.impl.DetailServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * Created by Eason on 2017/7/12.
 */
@Controller
public class UserInfoController {

    @Resource
    private DetailServiceImpl detailService = new DetailServiceImpl();

    @RequestMapping("/userUpload")
    public String userUpload(){
        return "/personal-upload";
    }
}
