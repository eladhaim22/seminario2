package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.CourseDetail;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface CourseDetailRepositoryImpl extends IEntityRepository<CourseDetail> {
    public CourseDetail findOneByCourse_IdAndStudent_User_Login(Long courseId,String login);

    public List<CourseDetail> findAllByCourse_Id(Long courseId);
}

