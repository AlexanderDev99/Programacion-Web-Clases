package com.programacion.web.repository;

import com.programacion.web.entities.Estudiante;
import org.apache.deltaspike.data.api.FullEntityRepository;
import org.apache.deltaspike.data.api.Repository;

@Repository
public interface EstudianteRepository extends FullEntityRepository<Estudiante, Integer> {
}
