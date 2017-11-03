package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.CourseDetail;
import com.uade.seminario2.repository.Impl.CourseDetailRepositoryImpl;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.Impl.StudentRepositoryImpl;
import com.uade.seminario2.service.dto.CourseDetailDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CourseDetailMapper implements IEntityMapper<CourseDetail,CourseDetailDTO>{

    @Autowired
    private CourseDetailRepositoryImpl CourseDetailsRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private CourseMapper courseMapper;

    public CourseDetailDTO ToDTO(CourseDetail entity) {
        return new CourseDetailDTO(){{
            setId(entity.getId());
            setCourse(courseMapper.ToDTO(entity.getCourse()));
            setStudent(studentMapper.ToDTO(entity.getStudent()));
            setNote(entity.getNote());
            setMessages(entity.getMessages().stream().map(message -> messageMapper.ToDTO(message)).collect(Collectors.toList()));
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
        courseDetail.setStudent(studentMapper.ToModel(model.getStudent()));
        courseDetail.getMessages().clear();
        courseDetail.getMessages().addAll(model.getMessages().stream().map(messageDTO -> messageMapper.ToModel(messageDTO)).collect(Collectors.toList()));
        return courseDetail;
    }
}
