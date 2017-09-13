package com.uade.seminario2.repository;

import com.uade.seminario2.domain.Entity;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface IEntityRepository<TEntity extends Entity> extends MongoRepository<TEntity, String> {
}
