package com.xs.repository;

import com.xs.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by zi_ge on 2017/7/3.
 */
public interface UserRepository extends JpaRepository<User,Integer> {
}
