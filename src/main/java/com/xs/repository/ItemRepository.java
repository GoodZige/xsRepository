package com.xs.repository;

import com.xs.domain.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by zi_ge on 2017/6/16.
 */
public interface ItemRepository extends JpaRepository<Item,Integer> {
    public List<Item> findByType(String type);

    Page<Item> findAll(Specification<Item> specification, Pageable pageable);
}
