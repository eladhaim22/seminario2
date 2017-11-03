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
public class CourseDetailDetailMapper implements IEntityMapper<CourseDetail,CourseDetailDTO>{

    @Autowired
    private CourseDetailRepositoryImpl CourseDetailsRepository;

    @Autowired
    private CourseRepositoryImpl courseRepository;

    @Autowired
    private StudentRepositoryImpl studentRepository;

    @Autowired
    private MessageMapper messageMapper;

    public CourseDetailDTO ToDTO(CourseDetail entity) {
        return new CourseDetailDTO(){{
            setId(entity.getId());
            setCourseId(entity.getId());
            setStudentId(entity.getStudent().getId());
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
        courseDetail.setCourse(courseRepository.findOne(model.getCourseId()));
        courseDetail.setStudent(studentRepository.findOne(model.getStudentId()));
        courseDetail.getMessages().clear();
        courseDetail.getMessages().addAll(model.getMessages().stream().map(messageDTO -> messageMapper.ToModel(messageDTO)).collect(Collectors.toList()));
        return courseDetail;
    }
}
