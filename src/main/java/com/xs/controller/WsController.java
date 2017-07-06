package com.xs.controller;

import com.xs.domain.Message;
import com.xs.repository.DetailRepository;
import com.xs.repository.MessageRepository;
import com.xs.service.DetailService;
import com.xs.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zi_ge on 2017/7/6.
 */
@Controller
public class WsController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private DetailService detailService;
    @Autowired
    private MessageService messageService;

    @RequestMapping("sendMessage")
    @ResponseBody
    public void sendMessage(@RequestParam(value = "writer") String writer,
                            @RequestParam(value = "receiver") String receiver,
                            @RequestParam(value = "content") String content){
        String head = detailService.findByName(writer).getHead();

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String now = sdf.format(date);

        Map map = new HashMap();
        map.put("writer",writer);
        map.put("content",content);
        map.put("date",now);
        map.put("head",head);
        messagingTemplate.convertAndSendToUser(receiver,"/message",map);
    }

    @RequestMapping("historyMessage")
    @ResponseBody
    public List<Message> getHistoryMessage(@RequestParam(value = "receiver") String receiver,
                                           @RequestParam(value = "writer") String writer){
        List<Message> list1 = messageService.findByWriter_name(writer);
        list1.addAll(messageService.findByWriter_name(receiver));
        return list1;
    }
}
