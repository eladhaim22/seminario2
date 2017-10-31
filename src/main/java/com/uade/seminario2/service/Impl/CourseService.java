package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Teacher;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.Impl.TeacherRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.TeacherDTO;
import com.uade.seminario2.service.mapper.Impl.CourseMapper;
import com.uade.seminario2.service.mapper.Impl.TeacherMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class CourseService extends GenericService<Course,CourseDTO> implements IGenericService<Course,CourseDTO> {
    public CourseService(CourseMapper courseMapper, CourseRepositoryImpl courseRepository) {
        super(courseMapper, courseRepository);
    }
}
