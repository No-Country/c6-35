package com.back.wg_assigner.security.service;

import com.back.wg_assigner.security.entity.UserSecurity;
import com.back.wg_assigner.security.repository.UserRepositorySecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
public class UserServiceSecurity {

    @Autowired
    UserRepositorySecurity userRepository;

    public Optional<UserSecurity> getByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public void save (UserSecurity user){
        userRepository.save(user);
    }
}
