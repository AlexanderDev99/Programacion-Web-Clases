package com.programacion.web.config;


import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Disposes;
import jakarta.enterprise.inject.Produces;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceUnit;

@ApplicationScoped
public class JpaConfig {

    @PersistenceUnit(unitName = "dbposts")
    private EntityManagerFactory entityManagerFactory;

    @PostConstruct
    public void init() {
        entityManagerFactory = Persistence.createEntityManagerFactory("dbposts");
    }

    @Produces
    @ApplicationScoped
    public EntityManagerFactory emf() {
        return entityManagerFactory;
    }

    @Produces
    @ApplicationScoped
    public EntityManager em() {
        return emf().createEntityManager();
    }

    void closeEntityManager(@Disposes EntityManager em) {

     if(em!=null) {
         em.close();
     }

    }
}
