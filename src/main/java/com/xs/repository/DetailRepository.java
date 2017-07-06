package com.xs.repository;

import com.xs.domain.Detail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zi_ge on 2017/7/6.
 */
public interface DetailRepository extends JpaRepository<Detail,Integer>{
    public Detail findByName(String name);
}
