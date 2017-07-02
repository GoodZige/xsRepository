package com.xs.controller;

import com.xs.domain.Item;
import com.xs.repository.ItemRepository;
import com.xs.service.ItemService;
import com.xs.service.impl.ItemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by zi_ge on 2017/6/22.
 */
@Controller
public class MainController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemService itemService;

    @RequestMapping("/food")
    public String toFood(){
        return "/food";
    }
    @ResponseBody
    @RequestMapping("getItemDetail")//用于返回自动补全所需数据
    public String getItemTitle(){
        return itemService.getItemDetailJson();
    }
    @ResponseBody
    @RequestMapping("getItems")
    public Map<String, Object> getItems(@RequestParam(value = "nowPage") Integer nowPage,
                                        @RequestParam(value = "type") String type,
                                        @RequestParam(value = "sort") String sort){
        return itemService.findThisPage(nowPage,type,sort);
    }
    @RequestMapping("backstage1")
    public String toBackstage1(){
        return "/backstage1";
    }
    @RequestMapping("backstage2")
    public String toBackstage2(){
        return "/backstage2";
    }
}
