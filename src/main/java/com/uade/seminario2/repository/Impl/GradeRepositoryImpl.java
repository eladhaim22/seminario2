package com.uade.seminario2.repository.Impl;


import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface GradeRepositoryImpl extends IEntityRepository<Grade> {

}
