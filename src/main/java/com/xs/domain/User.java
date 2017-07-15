package com.xs.domain;

import javax.persistence.*;

/**
 * Created by zi_ge on 2017/7/3.
 */
@Entity
public class User {//登录所需用户信息，可关联具体信息
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String email;
    private int authority;//管理权限:0,1

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAuthority() {
        return authority;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "detail_id")
    private Detail detail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
