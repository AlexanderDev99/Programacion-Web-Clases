package com.programacion.web.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate inscripcion;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    @JsonBackReference("estudiante-matriculas")
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    @JsonBackReference("curso-matriculas")
    private Curso curso;

}
