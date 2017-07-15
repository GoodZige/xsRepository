package com.xs.service;

import com.xs.domain.User;

/**
 * Created by zi_ge on 2017/7/4.
 */
public interface UserService {
    public User findByUsername(String username);
    public User findByEmail(String email);
    public User save(User user);
}
