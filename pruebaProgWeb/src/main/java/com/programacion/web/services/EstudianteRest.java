package com.programacion.web.services;


import com.programacion.web.entities.Estudiante;
import com.programacion.web.repository.EstudianteRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/estudiantes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class EstudianteRest {

    //inyeccion de la dependencias (repositorio del estudiante)
    @Inject
    EstudianteRepository repoEstudiante;

    //listar los estudiantes
    @GET
    public List<Estudiante> findAll() {
        return repoEstudiante.findAll();
    }

    //Buscar estudiante por id
    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Integer id) {
        return repoEstudiante.findOptionalBy(id)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

    //guardar estudiante
    @POST
    public void save(Estudiante estudiante) {
        repoEstudiante.save(estudiante);
    }

    //actualizar estudiante
    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, Estudiante estudiante) {
        return repoEstudiante.findOptionalBy(id).map(existe -> {
            estudiante.setId(id);
            Estudiante nuevoEstudiante = repoEstudiante.save(estudiante);
            return Response.ok(nuevoEstudiante).build();
        }).orElseGet(() ->
                Response.status(Response.Status.NOT_FOUND)
                        .entity("El estudiante con ID " + id + " no existe")
                        .build()
        );
    }

    //eliminar estudiante
    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id) {
        repoEstudiante.findOptionalBy(id).ifPresent(repoEstudiante::remove);
    }


}
