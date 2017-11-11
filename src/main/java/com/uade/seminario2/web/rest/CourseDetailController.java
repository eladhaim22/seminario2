package com.uade.seminario2.web.rest;

import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.Impl.CourseDetailService;
import com.uade.seminario2.service.dto.CourseDetailDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("api/courseDetail")
@Controller
public class CourseDetailController extends GenericController<CourseDetailDTO> {

    public CourseDetailController(CourseDetailService entityService) {
        super(entityService);
    }

    @GetMapping("/byCourse/{courseId}")
    public  ResponseEntity<CourseDetailDTO> getByCourseIdAndUserId(@PathVariable Long  courseId){
        return new ResponseEntity<CourseDetailDTO>(((CourseDetailService)this.entityService).getByCourseIdAndUserLogin(courseId,SecurityUtils.getCurrentUserLogin()),HttpStatus.OK);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseDetailDTO>> getByCourseId(@PathVariable Long  courseId){
        return new ResponseEntity<List<CourseDetailDTO>>(((CourseDetailService)entityService).getByCourseId(courseId), HttpStatus.OK);
    }

    @PostMapping("/saveAll")
    public ResponseEntity<List<CourseDetailDTO>> saveAll(@RequestBody ArrayList<CourseDetailDTO> courseDetails){
        try {
            return new ResponseEntity<>(((CourseDetailService) entityService).saveAll(courseDetails),HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

