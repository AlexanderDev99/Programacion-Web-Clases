package com.programacion.web;

import com.programacion.web.repositorios.UserRepository;
import jakarta.enterprise.inject.se.SeContainer;
import jakarta.enterprise.inject.se.SeContainerInitializer;
import jakarta.persistence.Persistence;
import jakarta.ws.rs.SeBootstrap;

import java.net.URI;

public class RestPostMain {
    public static void main(String[] args) throws Exception {


        //CONTENEDOR CDI
       var cdiConatiner = SeContainerInitializer.newInstance().initialize();

//        var repo = cdiConatiner.select(UserRepository.class).get();
//        var emf = Persistence.createEntityManagerFactory("dbposts");
//        var em = emf.createEntityManager();
//        System.out.println(em);
//        repo.findAll().forEach(System.out::println);

        // Configuramos el servidor JAX-RS
        SeBootstrap.Configuration config = SeBootstrap.Configuration.builder()
                .host("localhost")
                .port(8080)
                .protocol("http")
                .build();

        // SeBootstrap iniciará el servidor y el contenedor CDI interno (RESTEasy SE) de forma limpia
        SeBootstrap.start(MyApplication.class, config)
                .thenAccept(instance -> {
                    URI uri = instance.configuration().baseUri();
                    System.out.println("\n=============================================");
                    System.out.println("Servidor iniciado exitosamente en: " + uri);
                    System.out.println("=============================================\n");
                });

        // Mantener vivo el hilo principal
        Thread.currentThread().join();


    }
}