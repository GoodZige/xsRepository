package com.xs.domain;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by zi_ge on 2017/7/3.
 */
@Entity
public class Detail {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String head;
    private String introduce;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }
}
