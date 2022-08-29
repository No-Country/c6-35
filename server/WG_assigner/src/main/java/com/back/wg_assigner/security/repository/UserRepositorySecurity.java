package com.back.wg_assigner.security.repository;

import com.back.wg_assigner.security.entity.UserSecurity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositorySecurity extends JpaRepository<UserSecurity, Long>{
        Optional<UserSecurity> findByUserName(String nameUser);
        boolean existsByUserName(String nameUser);
        boolean existsByEmail(String email);
}
