package com.xs.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by zi_ge on 2017/7/5.
 */
@Entity
public class Message {
    @Id
    @GeneratedValue
    private Integer id;

    private String content;

    @JoinColumn(name="receiver_id")
    @ManyToOne
    private Detail receiver;
    @JoinColumn(name="writer_id")
    @ManyToOne
    private Detail writer;
    private Date date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Detail getReceiver() {
        return receiver;
    }

    public void setReceiver(Detail receiver) {
        this.receiver = receiver;
    }

    public Detail getWriter() {
        return writer;
    }

    public void setWriter(Detail writer) {
        this.writer = writer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", receiver=" + receiver +
                ", writer=" + writer +
                ", date=" + date +
                '}';
    }
}
