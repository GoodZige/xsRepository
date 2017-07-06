package com.xs.service.impl;

import com.xs.domain.Detail;
import com.xs.repository.DetailRepository;
import com.xs.service.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by zi_ge on 2017/7/6.
 */
@Service
public class DetailServiceImpl implements DetailService {
    @Autowired
    private DetailRepository detailRepository;

    @Override
    public Detail findByName(String name) {
        return detailRepository.findByName(name);
    }
}
