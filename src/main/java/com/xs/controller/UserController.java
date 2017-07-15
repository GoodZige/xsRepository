package com.xs.controller;

import com.xs.domain.Detail;
import com.xs.domain.User;
import com.xs.service.*;
import com.xs.service.impl.UserServiceImpl;
import com.xs.service.impl.DetailServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * 登录注册+显示信息
 * Created by Eason on 2017/6/25.
 */

@Controller
public class UserController {

    @Resource
    private UserServiceImpl userService = new UserServiceImpl();

    @Resource
    private DetailService detailService= new DetailServiceImpl();


    @RequestMapping("/register")
    @ResponseBody
    public String register(User user){
        if (userService.findByUsername(user.getUsername())!=null){
            return "0";//用户名已存在
        }else if (userService.findByEmail(user.getEmail())!=null){
            return "1";//邮箱已经存在
        }else {
            //进行数据库关联绑定
            Detail detail = new Detail();
            detail.setName(user.getUsername());
            user.setDetail(detail);
            detailService.save(detail);
            userService.save(user);
            return "2";
        }
    }

    @RequestMapping("/login")
    @ResponseBody
    public String login(User user,HttpServletRequest req){
        HttpSession name = req.getSession();
        User u = userService.findByUsername(user.getUsername());
        if (u!=null){
            if (user.getPassword().equals(u.getPassword())){
                name.setAttribute("username",u.getUsername());
                return "1";//登录成功
            }else {
                return "2";//密码错误
            }
        }else {
            return "0";//账号不存在
        }
    }

    //来显示用户昵称和头像
    @RequestMapping("/showUserInfo")
    @ResponseBody
    public List<String> showUserInfo(HttpServletRequest req){
        HttpSession info = req.getSession();
        List<String> userInfo = new ArrayList<>();
        if (info.getAttribute("username")!=null){
            Detail info_User = userService.findByUsername(info.getAttribute("username").toString()).getDetail();
            userInfo.add(info_User.getName());
            userInfo.add(info_User.getHead());
            return userInfo;
        }else {
            return userInfo;
        }
    }

    //注销
    @RequestMapping("/logout")
    @ResponseBody
    public void logout(HttpServletRequest req){
        HttpSession logout = req.getSession();
        logout.removeAttribute("username");
    }

}
