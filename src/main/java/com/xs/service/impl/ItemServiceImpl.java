package com.xs.service.impl;

import com.xs.domain.Item;
import com.xs.repository.ItemRepository;
import com.xs.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.util.*;

/**
 * Created by zi_ge on 2017/6/25.
 */
@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepository itemRepository;
    @Override
    public String getItemDetailJson() {
        List<Item> items = itemRepository.findAll();
        Iterator<Item> itemIterator = items.iterator();
        String json = "{";
        while (itemIterator.hasNext()){
            Item item = itemIterator.next();
            json+="\""+item.getWriter()+"\":\""+item.getTitle()+"\",";
        }
        json = json.substring(0,json.length()-1)+"}";
        return json;
    }

    @Override
    public List<Item> findByType(String type) {
        return itemRepository.findByType(type);
    }

    @Override
    public Map<String,Object> findThisPage(Integer nowPage,String type,String sort) {
        Sort sort1 = new Sort("date");
        Pageable pageable = new PageRequest(nowPage-1,12,sort1);
        Page<Item> page = itemRepository.findAll(new Specification<Item>() {

            public javax.persistence.criteria.Predicate toPredicate(Root<Item> root,
                                                                    CriteriaQuery<?> query, CriteriaBuilder cb) {
                Path<String> namePath = root.get("type");
                /**
                 * 连接查询条件, 不定参数，可以连接0..N个查询条件
                 */
                query.where(cb.equal(namePath, type)); //这里可以设置任意条查询条件

                return null;
            }
        },pageable);
        Iterator<Item> itemIterator = page.iterator();
        List<Item> itemList = new ArrayList<>();
        while (itemIterator.hasNext()){
            itemList.add(itemIterator.next());
        }
        Map<String,Object> itemMap = new HashMap<>();
        itemMap.put("itemList",itemList);
        itemMap.put("pages",page.getTotalPages());
        itemMap.put("count",page.getTotalElements());
        return itemMap;
    }
}
