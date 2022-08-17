package com.back.wg_assigner.repositories;

import org.springframework.stereotype.Repository;

import com.back.wg_assigner.entities.JobType;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface JobTypeRepository extends JpaRepository<JobType, Long> {

}