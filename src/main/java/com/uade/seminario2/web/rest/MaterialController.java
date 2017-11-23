package com.uade.seminario2.web.rest;

import com.uade.seminario2.domain.Material;
import com.uade.seminario2.service.Impl.GradeService;
import com.uade.seminario2.service.Impl.MaterialService;
import com.uade.seminario2.service.dto.GradeDTO;
import com.uade.seminario2.service.dto.MaterialDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("api/material")
@Controller
public class MaterialController extends GenericController<MaterialDTO> {

    public MaterialController(MaterialService entityService) {
        super(entityService);
    }

}
