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
    public Date sendMessage(@RequestParam(value = "writer") String writer,
                            @RequestParam(value = "receiver") String receiver,
                            @RequestParam(value = "content") String content){
        return messageService.saveAndSendMessage(writer,receiver,content);
    }

    @RequestMapping("historyMessage")
    @ResponseBody
    public List<Message> getHistoryMessage(@RequestParam(value = "receiver") String receiver,
                                           @RequestParam(value = "writer") String writer){
        List<Message> list1 = messageService.findByReceiver_name(writer);
        list1.addAll(messageService.findByWriter_name(receiver));
        return list1;
    }
    @RequestMapping("readMessage")
    @ResponseBody
    public void readMessage(@RequestParam(value = "writer") String writer,
                            @RequestParam(value = "receiver") String receiver){
        messageService.updateMessageFlag(writer,receiver);
    }
}
