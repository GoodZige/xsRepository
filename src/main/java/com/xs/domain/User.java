package com.xs.domain;

import javax.persistence.*;

/**
 * Created by zi_ge on 2017/7/3.
 */
@Entity
public class User {//登录所需用户信息，可关联具体信息
    @Id
    @GeneratedValue
    private Integer id;
    private String account;
    private String password;
    private String email;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "detail_id")
    private Detail detail;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Detail getDetail() {
        return detail;
    }

    public void setDetail(Detail detail) {
        this.detail = detail;
    }
}
