package com.xs.service.impl;

import com.xs.domain.Detail;
import com.xs.domain.Message;
import com.xs.repository.MessageRepository;
import com.xs.service.DetailService;
import com.xs.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zi_ge on 2017/7/6.
 */
@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private DetailService detailService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public List<Message> findByWriter_name(String name) {
        return messageRepository.findByWriter_name(name);
    }

    @Override
    public List<Message> findByReceiver_name(String name) {
        return messageRepository.findByReceiver_name(name);
    }

    @Override
    public List<Message> findByWriter_nameAndReceiver_name(String writer, String receiver) {
        return messageRepository.findByWriter_nameAndReceiver_name(writer,receiver);
    }

    @Override
    public void updateMessageFlag(String writer, String receiver) {
        List<Message> list = messageRepository.findByWriter_nameAndReceiver_name(writer,receiver);
        Iterator<Message> iterator = list.iterator();
        Message message = new Message();
        while (iterator.hasNext()){
            message = iterator.next();
            message.setFlag(1);
            messageRepository.save(message);
        }
    }

    @Override
    public Date saveAndSendMessage(String writer, String receiver, String content) {
        Detail writerDetail = detailService.findByName(writer);
        Detail receiverDetail = detailService.findByName(receiver);
        String head = writerDetail.getHead();

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
        String now = sdf.format(date);

        Message message = new Message();
        message.setFlag(0);
        message.setContent(content);
        message.setDate(date);
        message.setReceiver(receiverDetail);
        message.setWriter(writerDetail);
        messageRepository.save(message);

        Map map = new HashMap();
        map.put("writer",writer);
        map.put("content",content);
        map.put("date",now);
        map.put("head",head);
        messagingTemplate.convertAndSendToUser(receiver,"/message",map);

        return date;
    }
}
