package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper implements IEntityMapper<Course,CourseDTO>{

    @Autowired
    private CourseRepositoryImpl coursesRepository;

    public CourseDTO ToDTO(Course entity) {
        return new CourseDTO(){{
            setId(entity.getId());
            setName(entity.getName());
        }};
    }

    public Course ToModel(CourseDTO model) {
        Course course = null;
        if (model.getId() == null) {
            course = new Course();
        }
        else {
            course = coursesRepository.findOne(model.getId());
        }
        course.setName(model.getName());
        return course;
    }
}
