package com.programacion.web.rest;

import com.programacion.web.db.User;
import com.programacion.web.repositorios.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import org.jboss.logging.annotations.Param;

import java.awt.*;
import java.util.List;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class UserRest {

    @Inject
    UserRepository userRepository;

    @GET
    public List<User> finAll(){
        return userRepository.findAll();
    }

    @GET
    @Path("/{id}")
    public Response finById(@PathParam("id") Integer id){
        return userRepository.findOptionalBy(id)
                .map(Response::ok)
                .orElse(Response.status(Response.Status.NOT_FOUND))
                .build();

    }

    @POST
    public void save(User user){
        userRepository.save(user);
    }

    @PUT
    @Path("/{id}")
    public void update(@PathParam("id") Integer id, User user){
        userRepository.findOptionalBy(id).ifPresent(existingUser -> {
            userRepository.save(user);
        });
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") Integer id){
        userRepository.findOptionalBy(id).ifPresent(userRepository::remove);
    }
}