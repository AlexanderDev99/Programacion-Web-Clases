package com.programacion.web.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String apellido;
    private String email;

    @Column(name = "fecha_nacimiento")
    private LocalDate fecha;


    @OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL)
    @JsonManagedReference("estudiante-matriculas")
    private List<Matricula> matriculas;

}
