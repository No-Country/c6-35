package com.back.wg_assigner.repositories;

import com.back.wg_assigner.entities.WorkTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkTeamRepository extends JpaRepository<WorkTeam, Long> {
}
