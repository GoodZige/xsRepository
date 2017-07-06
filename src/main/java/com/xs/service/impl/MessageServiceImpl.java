package com.xs.service.impl;

import com.xs.domain.Message;
import com.xs.repository.MessageRepository;
import com.xs.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zi_ge on 2017/7/6.
 */
@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;

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
}
