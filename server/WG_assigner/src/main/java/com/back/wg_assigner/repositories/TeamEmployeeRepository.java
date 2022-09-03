package com.back.wg_assigner.repositories;

import com.back.wg_assigner.entities.TeamEmployee;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamEmployeeRepository extends PagingAndSortingRepository<TeamEmployee, Long> {
}
