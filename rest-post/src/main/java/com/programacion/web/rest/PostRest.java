package com.programacion.web.rest;

import com.programacion.web.db.Post;
import com.programacion.web.repositorios.PostRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class PostRest {

    @Inject
    PostRepository repository;

    @GET
    public List<Post> findAll() {
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
    public void save(Post post) {
        repository.save(post);
    }

    @PUT
    @Path("/{id}")
    public void update(@PathParam("id") Integer id, Post post) {
        repository.findOptionalBy(id).ifPresent(existing -> {
            post.setId(id);
            repository.save(post);
        });
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id) {
        repository.findOptionalBy(id).ifPresent(repository::remove);
    }
}
