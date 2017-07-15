package com.xs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Random;

/**
 * Created by Eason on 2017/6/25.
 */
@Controller
public class Email {

    @Autowired
    private JavaMailSender mailSender;

    @ResponseBody
    @PostMapping("/send")
    public void simpleSend(@RequestParam String email, HttpServletRequest req) {

        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom("837447352@qq.com");
        smm.setTo(email);
        smm.setSubject("您的激活邮件");
        Random random = new Random();
        int a = random.nextInt(999999);
        smm.setText("您的激活码是:"+a);
        HttpSession num = req.getSession();
        num.setAttribute("code",a);
        HttpSession test = req.getSession();
        test.setAttribute("email",email);
        mailSender.send(smm);
    }

    @ResponseBody
    @GetMapping("/getCode")
    public String get(HttpServletRequest req){
        HttpSession get = req.getSession();
        if (get.getAttribute("code") == null){
            return "CookiesEason";
        }else {
            return get.getAttribute("code").toString();
        }
    }

    @ResponseBody
    @GetMapping("/getEmail")
    public String email(HttpServletRequest req){
        HttpSession get = req.getSession();
        if (get.getAttribute("email") == null){
            return "CookiesEason";
        }else {
            return get.getAttribute("email").toString();
        }
    }
}
