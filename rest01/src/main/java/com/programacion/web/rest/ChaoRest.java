package com.programacion.web.rest;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.time.LocalDateTime;

@Path("/chao")
public class ChaoRest {

    @GET
    public String ChaoRest() {
        return  "ChaoRest" + LocalDateTime.now();
    }
}
