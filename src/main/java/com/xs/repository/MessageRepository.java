package com.xs.repository;

import com.xs.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by zi_ge on 2017/7/5.
 */
public interface MessageRepository extends JpaRepository<Message,Integer> {
    public List<Message> findByWriter_name(String name);
    public List<Message> findByReceiver_name(String name);
    public List<Message> findByWriter_nameAndReceiver_name(String writer,String receiver);
}
