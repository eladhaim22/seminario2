package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.mapper.Impl.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseService extends GenericService<Course,CourseDTO> implements IGenericService<Course,CourseDTO> {
    public CourseService(CourseMapper courseMapper, CourseRepositoryImpl courseRepository) {
        super(courseMapper, courseRepository);
    }

    @Autowired
    private UserRepository userRepository;

    public List<CourseDTO> getCoursesByUserLogin(String login){
        User user = userRepository.findOneByLogin(login).get();
        List<Course> courses = ((CourseRepositoryImpl)this.repository).findAllByGrade_Id(user.getGrade().getId());
        return courses.stream().map(course -> ((CourseMapper)this.entityMapper).ToDTO(course)).collect(Collectors.toList());
    }
}
