package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Student;
import com.uade.seminario2.repository.Impl.CoursesRepositoryImpl;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class CourseMapper implements IEntityMapper<Course,CourseDTO>{

    @Autowired
    private CoursesRepositoryImpl coursesRepository;

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
