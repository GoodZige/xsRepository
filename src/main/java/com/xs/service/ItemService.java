package com.xs.service;

import com.xs.domain.Item;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by zi_ge on 2017/6/25.
 */
public interface ItemService {
    public String getItemDetailJson();
    public List<Item> findByType(String type);
    public Map<String,Object> findThisPage(Integer nowPage, String type,String sort);
}
