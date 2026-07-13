package com.programacion.web.services;

import com.programacion.web.entities.Curso;
import com.programacion.web.repository.CursoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/cursos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class CursoRest {

    @Inject
    CursoRepository repoCurso;

    //listar los curos
    @GET
    public List<Curso> findAll() {
        return repoCurso.findAll();
    }

    //buscar un curso por id
    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Integer id) {
        return repoCurso.findOptionalBy(id)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND)
                        .entity("El curso con ID " + id + " no existe.")
                )
                .build();
    }

    //crear un curso
    @POST
    public void save(Curso curso) {
        repoCurso.save(curso);
    }

    //actualizar un curso
    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, Curso curso) {
        return repoCurso.findOptionalBy(id).map(existe -> {
                    //asignamos el id buscado al JSON nuevo
                    curso.setId(id);

                    //creamos y guadamos el curso
                    Curso nuevoCurso = repoCurso.save(curso);
                    return Response.ok(nuevoCurso).build();
                })
                .orElseGet(() ->
                        Response.status(Response.Status.NOT_FOUND)
                                .entity("El curso con ID " + id + " no existe.")
                                .build()
                );

    }

    //eliminar un curso
    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id) {
        repoCurso.findOptionalBy(id).ifPresent(repoCurso::remove);
    }

}
