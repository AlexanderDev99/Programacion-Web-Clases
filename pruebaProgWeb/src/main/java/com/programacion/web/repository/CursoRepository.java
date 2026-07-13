package com.programacion.web.repository;


import com.programacion.web.entities.Curso;
import org.apache.deltaspike.data.api.FullEntityRepository;
import org.apache.deltaspike.data.api.Repository;

@Repository
public interface CursoRepository extends FullEntityRepository<Curso, Integer> {
}
