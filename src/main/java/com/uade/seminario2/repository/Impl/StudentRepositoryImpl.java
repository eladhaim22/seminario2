package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Student;
import com.uade.seminario2.domain.Teacher;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface StudentRepositoryImpl extends IEntityRepository<Student> {
    public Student findFirstByUserId(Long id);
}
