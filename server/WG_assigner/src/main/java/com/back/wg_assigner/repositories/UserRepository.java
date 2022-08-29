package com.back.wg_assigner.repositories;

import com.back.wg_assigner.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    public List<User> findUserByUserNameOrEmail(String user, String email);
    public Page<User> findByDeleted(boolean deleted,Pageable pageable);
}