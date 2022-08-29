package com.back.wg_assigner.security.repository;

import com.back.wg_assigner.security.entity.RoleSecurity;
import com.back.wg_assigner.security.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositorySecurity extends JpaRepository<RoleSecurity, Long> {
    Optional<RoleSecurity> findByRoleName(RoleName roleName);
}
