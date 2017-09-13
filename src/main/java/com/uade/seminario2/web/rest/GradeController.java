package com.uade.seminario2.web.rest;

import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.Impl.GradeService;
import com.uade.seminario2.service.dto.GradeDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@RequestMapping("API/Grade")
@Controller
public class GradeController extends GenericController<GradeDTO> {

    public GradeController(GradeService entityService) {
        super(entityService);
    }
}
