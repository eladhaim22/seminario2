package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CourseMapper implements IEntityMapper<Course,CourseDTO>{

    @Autowired
    private CourseRepositoryImpl coursesRepository;

    @Autowired
    private UserMapper userMapper;

    public CourseDTO ToDTO(Course entity) {
        return new CourseDTO(){{
            setId(entity.getId());
            setName(entity.getName());
            setUsers(userMapper.usersToUserDTOs(entity.getUsers()));
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
        course.getUsers().clear();
        course.getUsers().addAll(userMapper.userDTOsToUsers(model.getUsers()));
        return course;
    }
}
