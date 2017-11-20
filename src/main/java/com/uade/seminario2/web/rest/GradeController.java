package com.uade.seminario2.web.rest;

import com.uade.seminario2.security.AuthoritiesConstants;
import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.Impl.CourseService;
import com.uade.seminario2.service.Impl.GradeService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.GradeDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("api/grade")
@Controller
public class GradeController extends GenericController<GradeDTO> {

    public GradeController(GradeService entityService) {
        super(entityService);
    }

}
