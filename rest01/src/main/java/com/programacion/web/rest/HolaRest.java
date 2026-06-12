package com.programacion.web.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;

import java.time.LocalDateTime;

/*
http://localhost:8080/api/hola
 */
@Path("/hola")
public class HolaRest {


    //Los pathparam los usamos para identificar recursos
    // /api/hola/mundo1
    @GET
    @Path("/mundo1")
    public String Hola1() {
        return "Hola Rest: " + LocalDateTime.now();
    }

    // /api/hola/mundo2/{nombre}
    @GET
    @Path("/mundo2/{nombre}/{apellido}")
    public String Hola2(@PathParam("nombre")  String nombre,  @PathParam("apellido")  String apellido) {
        return "Hola %s:%s --> %s".formatted(nombre, apellido, LocalDateTime.now());
    }


    //Los querryparam los usamos para filtros y ordeñamiento
    /*
    /api/hola3?nombre=aa & apellido=dddd
     */
    @GET
    @Path("/mundo3")
    public String Hola3(@QueryParam("nombre") String nombre,  @QueryParam("apellido") String apellido) {
        return "Hola %s:%s --> %s".formatted(nombre, apellido, LocalDateTime.now());
    }

    @GET
    @Path("/mundo4")
    public String Hola4(@Context HttpServletRequest request, @HeaderParam("host") String host11) {
        var host = request.getHeader("host");
        String nombre = request.getParameter("nombre");
        return "hola 4" + host + "----" + host11 + "---nombre" + nombre;
    }

    //combinando
    @GET
    @Path("/personas")
    public String listarPersonas(@QueryParam("sort") @DefaultValue("Apellido") String sort) {
        return "Listar personas ordenado por: " + sort;
    }



}
