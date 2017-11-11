package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.CourseDetail;
import com.uade.seminario2.repository.Impl.CourseDetailRepositoryImpl;
import com.uade.seminario2.service.dto.CourseDetailDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CourseDetailMapper implements IEntityMapper<CourseDetail,CourseDetailDTO>{

    @Autowired
    private CourseDetailRepositoryImpl CourseDetailsRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CourseMapper courseMapper;

    public CourseDetailDTO ToDTO(CourseDetail entity) {
        return new CourseDetailDTO(){{
            setId(entity.getId());
            setCourse(courseMapper.ToDTO(entity.getCourse()));
            setStudent(userMapper.userToUserDTO(entity.getStudent()));
            setNote(entity.getNote());
        }};
    }

    public CourseDetail ToModel(CourseDetailDTO model) {
        CourseDetail courseDetail = null;
        if (model.getId() == null) {
            courseDetail = new CourseDetail();
        }
        else {
            courseDetail = CourseDetailsRepository.findOne(model.getId());
        }
        courseDetail.setId(model.getId());
        courseDetail.setNote(model.getNote());
        courseDetail.setCourse(courseMapper.ToModel(model.getCourse()));
        courseDetail.setStudent(userMapper.userDTOToUser(model.getStudent()));
        return courseDetail;
    }
}
