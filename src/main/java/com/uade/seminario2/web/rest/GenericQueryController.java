package com.uade.seminario2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.uade.seminario2.service.IGenericQueryService;

import com.uade.seminario2.service.dto.EntityDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


public class GenericQueryController<TDTO extends EntityDTO> {

    public GenericQueryController(IGenericQueryService genericService){
        this.entityService = genericService;
    }

    protected IGenericQueryService entityService;

    @GetMapping("/")
    @Timed
    protected ResponseEntity<List<TDTO>> GetAll(){
        return new ResponseEntity<>(entityService.GetAll(),null, HttpStatus.OK);
    }
}
