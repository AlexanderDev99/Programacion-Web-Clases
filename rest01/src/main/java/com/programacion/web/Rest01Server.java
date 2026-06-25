package com.programacion.web;

import jakarta.ws.rs.SeBootstrap;

import java.net.URI;

public class Rest01Server {

    public static void main(String[] args) throws Exception {

        // configuracion del contenedor
        SeBootstrap.Configuration config  = SeBootstrap.Configuration.builder()
                .host("0.0.0.0")
                .port(8080)
                .protocol("http")
                .build();

        //inicializamos el contenedor y lo manejamos de manera asincronica
        SeBootstrap.start(MyApplication.class, config)
                .thenAccept(instance -> {
                    System.out.println(instance);
                    URI uri = instance.configuration().baseUri();
                    System.out.println("Server starter at " + uri);
                });
        Thread.currentThread().join();

    }
}