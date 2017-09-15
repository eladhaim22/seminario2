package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.EntityImpl;
import com.uade.seminario2.repository.IEntityRepository;
import com.uade.seminario2.service.mapper.IEntityMapper;
import com.uade.seminario2.service.IGenericQueryService;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.EntityDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class GenericService<TEntity extends EntityImpl,TDTO extends EntityDTO> implements
    IGenericQueryService<TEntity,TDTO>,IGenericService<TEntity,TDTO> {

    private IEntityRepository repository;

    private IEntityMapper entityMapper;


    public GenericService(IEntityMapper entityMapper,IEntityRepository entityRepository){
        this.entityMapper = entityMapper;
        this.repository = entityRepository;
    }


    public TDTO GetById(String id){
        return (TDTO)entityMapper.ToDTO((TEntity)repository.findOne(id));
    }

    public List<TDTO> GetAll() {
        List<TEntity> list = new ArrayList<>();
        for(Object object : repository.findAll()){
            list.add((TEntity) object);
       }
       return list.stream().map(entity -> (TDTO)entityMapper.ToDTO(entity)).collect(Collectors.toList());
    }

    public void Create(TDTO entityDto) {
      repository.save((TEntity)entityMapper.ToModel(entityDto));
    }


    public void Update(TDTO entityDto) {
        repository.save((TEntity)entityMapper.ToModel(entityDto));
    }

    public void Delete(Long id) {
        repository.delete(id);
    }
}
