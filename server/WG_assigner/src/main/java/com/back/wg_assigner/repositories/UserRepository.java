package com.back.wg_assigner.repositories;

import org.springframework.stereotype.Repository;

@Repository
public Interface UserRepository extends JpaRepository<User, Long>{
}