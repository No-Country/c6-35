package com.back.wg_assigner.security.service;

import com.back.wg_assigner.security.entity.RoleSecurity;
import com.back.wg_assigner.security.enums.RoleName;
import com.back.wg_assigner.security.repository.RoleRepositorySecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RoleService {

    @Autowired
    RoleRepositorySecurity roleRepository;

    public Optional<RoleSecurity> getByRoleName(RoleName roleName) {
        return roleRepository.findByRoleName(roleName);
    }
}
