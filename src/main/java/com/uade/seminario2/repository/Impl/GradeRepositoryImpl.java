package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface GradeRepositoryImpl extends IEntityRepository<Grade> {
    Grade findByUsersContaining(User user);
}
