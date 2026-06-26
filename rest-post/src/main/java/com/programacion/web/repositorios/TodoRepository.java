package com.programacion.web.repositorios;

import com.programacion.web.db.Todo;
import org.apache.deltaspike.data.api.FullEntityRepository;
import org.apache.deltaspike.data.api.Repository;

@Repository
public interface TodoRepository extends FullEntityRepository<Todo, Integer> {
}
