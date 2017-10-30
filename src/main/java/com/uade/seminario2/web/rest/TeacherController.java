package com.uade.seminario2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.uade.seminario2.security.AuthoritiesConstants;
import com.uade.seminario2.service.Impl.TeacherService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.TeacherDTO;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("API/Teacher")
@Controller
public class TeacherController extends GenericController<TeacherDTO> {

    public TeacherController(TeacherService entityService) {
        super(entityService);
    }

    @GetMapping("/")
    @Secured(AuthoritiesConstants.PROFESSOR)
    public List<CourseDTO> getAuthorities() {
        return ((TeacherService)this.entityService).getAllCourses(new Long(1));
    }

}
