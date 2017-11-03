package com.uade.seminario2.web.rest;

import com.uade.seminario2.config.Constants;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.security.AuthoritiesConstants;
import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.Impl.CourseService;
import com.uade.seminario2.service.Impl.StudentService;
import com.uade.seminario2.service.Impl.TeacherService;
import com.uade.seminario2.service.Impl.UserService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.TeacherDTO;
import com.uade.seminario2.service.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("api/course")
@Controller
public class CourseController extends GenericController<CourseDTO> {

    public CourseController(CourseService entityService) {
        super(entityService);
    }

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/getAllByUser")
    public ResponseEntity<List<CourseDTO>> GetAllByUser(){
        if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            return new ResponseEntity<List<CourseDTO>>(((CourseService)entityService).GetAll(), HttpStatus.OK);
        }
        else{
            if(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.PROFESSOR)) {
                return new ResponseEntity<List<CourseDTO>>(teacherService.getCoursesByUserId(SecurityUtils.getCurrentUserLogin()), HttpStatus.OK);
            }
            else {
                if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER)) {
                    return new ResponseEntity<List<CourseDTO>>(studentService.getCoursesByUserId(SecurityUtils.getCurrentUserLogin()), HttpStatus.OK);
                }
                else return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        }
    }


}
