package com.programacion.web.rest;

import com.programacion.web.db.Comment;
import com.programacion.web.repositorios.CommentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/comments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class CommentRest {

    @Inject
    CommentRepository repository;

    @GET
    public List<Comment> findAll() {
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
    public void save(Comment comment) {
        repository.save(comment);
    }

    @PUT
    @Path("/{id}")
    public void update(@PathParam("id") Integer id, Comment comment) {
        repository.findOptionalBy(id).ifPresent(existing -> {
            comment.setId(id);
            repository.save(comment);
        });
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id) {
        repository.findOptionalBy(id).ifPresent(repository::remove);
    }
}
