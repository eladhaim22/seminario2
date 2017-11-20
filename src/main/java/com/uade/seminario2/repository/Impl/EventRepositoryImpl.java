package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.CourseDetail;
import com.uade.seminario2.domain.Event;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface EventRepositoryImpl extends IEntityRepository<Event> {
    List<Event> findAllByGrade_Id(Long id);
}

