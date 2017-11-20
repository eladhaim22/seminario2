package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Event;
import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.repository.Impl.EventRepositoryImpl;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.dto.EventDTO;
import com.uade.seminario2.service.dto.GradeDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.hibernate.query.criteria.internal.expression.function.AggregationFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class GradeMapper implements IEntityMapper<Grade,GradeDTO>{

    @Autowired
    private GradeRepositoryImpl gradeRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private UserRepository userRepository;

    public GradeDTO ToDTO(Grade entity) {
            return new GradeDTO(){{
            setId(entity.getId());
            setName(entity.getName());
            setCourses(entity.getCourses().stream().map(course -> courseMapper.ToDTO(course))
            .collect(Collectors.toList()));
            setUsers(entity.getUsers().stream().map(user -> user.getId()).collect(Collectors.toList()));
        }};
    }

    public Grade ToModel(GradeDTO model) {
        Grade grade = null;
        if (model.getId() == null) {
            grade = new Grade();
        }
        else {
            grade = gradeRepository.findOne(model.getId());
        }
        grade.setName(model.getName());
        grade.getCourses().clear();
        grade.getCourses().addAll(model.getCourses().stream()
            .map(courseDTO -> courseMapper.ToModel(courseDTO)).collect(Collectors.toList()));
        grade.getUsers().clear();
        grade.getUsers().addAll(userRepository.findAllByIdIn(model.getUsers()));
        return grade;
    }
}
