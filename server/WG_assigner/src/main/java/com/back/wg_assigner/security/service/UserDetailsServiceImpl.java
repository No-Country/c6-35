package com.back.wg_assigner.security.service;

import com.back.wg_assigner.security.entity.MainUser;
import com.back.wg_assigner.security.entity.UserSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserServiceSecurity userServiceSecurity;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserSecurity user = userServiceSecurity.getByUserName(username).get();
        return MainUser.build(user);
    }
}
