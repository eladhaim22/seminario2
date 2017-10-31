package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Teacher;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepositoryImpl extends IEntityRepository<Teacher> {
    public Teacher findOneByUser_Login(String login);
}
