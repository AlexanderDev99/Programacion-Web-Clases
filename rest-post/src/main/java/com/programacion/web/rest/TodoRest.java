package com.programacion.web.rest;

import com.programacion.web.db.Todo;
import com.programacion.web.repositorios.TodoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class TodoRest {

    @Inject
    TodoRepository repository;

    @GET
    public List<Todo> findAll() {
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
    public void save(Todo todo) {
        repository.save(todo);
    }

    @PUT
    @Path("/{id}")
    public void update(@PathParam("id") Integer id, Todo todo) {
        repository.findOptionalBy(id).ifPresent(existing -> {
            todo.setId(id);
            repository.save(todo);
        });
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id) {
        repository.findOptionalBy(id).ifPresent(repository::remove);
    }
}
