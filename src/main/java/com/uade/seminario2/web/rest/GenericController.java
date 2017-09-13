package com.uade.seminario2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.EntityDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class GenericController<TDTO extends EntityDTO> extends GenericQueryController<TDTO> {

    public GenericController(IGenericService entityService){
        super(entityService);
    }

    @PostMapping("/")
    @Timed
    protected ResponseEntity Create(@RequestBody TDTO entityDTO){
        try {
            ((IGenericService)entityService).Create(entityDTO);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/")
    @Timed
    protected ResponseEntity Update(@RequestBody TDTO entityDTO){
        try {
            ((IGenericService)entityService).Update(entityDTO);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    @Timed
    protected ResponseEntity Delete(@PathVariable String id){
        try {
            ((IGenericService)entityService).Delete(Long.parseLong(id));
            return new ResponseEntity(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
