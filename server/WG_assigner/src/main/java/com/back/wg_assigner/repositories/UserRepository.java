package com.back.wg_assigner.repositories;

import com.back.wg_assigner.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public List<User> findUserByUserNameOrEmail(String user, String email);
}