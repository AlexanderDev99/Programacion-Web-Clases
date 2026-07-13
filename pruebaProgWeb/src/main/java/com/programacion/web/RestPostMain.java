package com.programacion.web;

import jakarta.enterprise.inject.se.SeContainerInitializer;
import jakarta.ws.rs.SeBootstrap;

import java.net.URI;

public class RestPostMain {
    public static void main(String[] args) throws Exception {
        System.out.println("-------------- LANZANDO CONTENEDOR ");
        var contenedor = SeContainerInitializer.newInstance().initialize();


        System.out.println("---------------- LANZANDO SERVICIO / API");

        //Configuracion del servido
        SeBootstrap.Configuration config = SeBootstrap.Configuration.builder()
                .host("localhost")
                .port(8080)
                .protocol("http")
                .build();

        //Iniciamos el servicio
        SeBootstrap.start(RestAplication.class, config)
                .thenAccept(instance -> {
                    URI uri = instance.configuration().baseUri();
                    System.out.println("=================================");
                    System.out.println("Servidor inciado exitosamente en: " + uri);
                    System.out.println("=================================");
                });

        //mantenemos vivo el hilo principal
        Thread.currentThread().join();

    }
}
