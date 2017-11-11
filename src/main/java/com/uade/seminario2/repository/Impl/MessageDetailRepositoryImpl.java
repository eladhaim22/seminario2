package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.CourseDetail;
import com.uade.seminario2.domain.MessageDetail;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface MessageDetailRepositoryImpl extends IEntityRepository<MessageDetail> {

    public List<MessageDetail> findAllByOwner_LoginAndCourse_Id(String login,Long courseId);

    public List<MessageDetail> findAllByTargetUser_LoginAndCourse_Id(String login,Long courseId);
}

