package com.xs.service.impl;

import com.xs.domain.User;
import com.xs.service.UserService;
import com.xs.repository.*;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 实现功能
 * Created by Eason on 2017/6/25.
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserRepository userRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }


}
