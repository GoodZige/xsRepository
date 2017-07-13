package com.xs.service;

import com.xs.domain.Message;

import java.util.Date;
import java.util.List;

/**
 * Created by zi_ge on 2017/7/6.
 */
public interface MessageService {
    public List<Message> findByWriter_name(String name);
    public List<Message> findByReceiver_name(String name);
    public List<Message> findByWriter_nameAndReceiver_name(String writer,String receiver);
    public void updateMessageFlag(String writer,String receiver);
    public Date saveAndSendMessage(String writer, String receiver, String content);
}
