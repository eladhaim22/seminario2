package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Student;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface CoursesRepositoryImpl extends IEntityRepository<Course> {

}
