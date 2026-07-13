package com.programacion.web.repository;

import com.programacion.web.entities.Matricula;
import org.apache.deltaspike.data.api.FullEntityRepository;
import org.apache.deltaspike.data.api.Repository;

@Repository
public interface MatriculaRepository extends FullEntityRepository<Matricula, Integer> {
}
