package com.programacion.web.rest;

import com.programacion.web.db.Album;
import com.programacion.web.repositorios.AlbumRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/albums")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class AlbumRest {

    @Inject
    AlbumRepository repository;

    @GET
    public List<Album> findAll() {
        return repository.findAll();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Integer id) {
        return repository.findOptionalBy(id)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();
    }

    @POST
    public void save(Album album) {
        repository.save(album);
    }

    @PUT
    @Path("/{id}")
    public void update(@PathParam("id") Integer id, Album album) {
        repository.findOptionalBy(id).ifPresent(existing -> {
            album.setId(id);
            repository.save(album);
        });
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id) {
        repository.findOptionalBy(id).ifPresent(repository::remove);
    }
}
