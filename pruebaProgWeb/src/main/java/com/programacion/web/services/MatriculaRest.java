package com.programacion.web.services;



import com.programacion.web.entities.Matricula;
import com.programacion.web.repository.MatriculaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;


@Path("/matriculas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class MatriculaRest {

    @Inject
    MatriculaRepository repoMatricula;

    //Listar las matriculas
    @GET
    public List<Matricula> findAll(){
        return repoMatricula.findAll();
    }

    //Buscar matricula por Id
    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Integer id){
        return  repoMatricula.findOptionalBy(id)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND)
                        .entity("La matricula con ID " + id + " no existe"))
                .build();
    }

    //Crear matricula
    @POST
    public void save(Matricula matricula){
        repoMatricula.save(matricula);
    }

    //Modificar la matricula por id
    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, Matricula matricula){
       return repoMatricula.findOptionalBy(id).map(existe -> {
                            //guardamos el id en la nueva matricula
                            matricula.setId(id);

                            //Guardamos la nueva matricula
                            Matricula nuevaMatricula = repoMatricula.save(matricula);
                                    return Response.ok(nuevaMatricula).build();
                        }).orElseGet( () ->
                Response.status(Response.Status.NOT_FOUND)
                        .entity("La matricula con ID " + id + " no existe")
                        .build()
                );
    }

    //Eliminar matricula por id
    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id){
        repoMatricula.findOptionalBy(id).ifPresent(repoMatricula::remove);
    }


}
