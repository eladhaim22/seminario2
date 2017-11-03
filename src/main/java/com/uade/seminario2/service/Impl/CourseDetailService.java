package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.CourseDetail;
import com.uade.seminario2.repository.Impl.CourseDetailRepositoryImpl;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.CourseDetailDTO;
import com.uade.seminario2.service.mapper.Impl.CourseDetailMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseDetailService extends GenericService<CourseDetail,CourseDetailDTO> implements IGenericService<CourseDetail,CourseDetailDTO> {
    public CourseDetailService(CourseDetailMapper courseDetailMapper, CourseDetailRepositoryImpl courseDetailRepository) {
        super(courseDetailMapper, courseDetailRepository);

    }

    public CourseDetailDTO getByCourseIdAndUserLogin(Long courseId,String login){
        CourseDetail courseDetail = ((CourseDetailRepositoryImpl)this.repository).findOneByCourse_IdAndStudent_User_Login(courseId,login);
        return ((CourseDetailMapper)entityMapper).ToDTO(courseDetail);
    }

    public List<CourseDetailDTO> getByCourseId(Long courseId){
        List<CourseDetail> courseDetails = ((CourseDetailRepositoryImpl)this.repository).findAllByCourse_Id(courseId);
        return courseDetails.stream().map(courseDetail -> ((CourseDetailMapper)entityMapper).ToDTO(courseDetail)).collect(Collectors.toList());
    }

    public List<CourseDetailDTO> saveAll(List<CourseDetailDTO> courseDetailDTOS){
        List<CourseDetail> courseDetails = courseDetailDTOS.stream().map(courseDetail -> ((CourseDetailMapper)entityMapper).ToModel(courseDetail))
            .collect(Collectors.toList());
        courseDetails = ((CourseDetailRepositoryImpl)this.repository).save(courseDetails);
        return courseDetails.stream().map(courseDetail -> ((CourseDetailMapper)entityMapper).ToDTO(courseDetail))
            .collect(Collectors.toList());
    }
}
