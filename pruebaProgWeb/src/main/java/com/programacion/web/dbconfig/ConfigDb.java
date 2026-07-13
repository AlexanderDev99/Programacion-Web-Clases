package com.programacion.web.dbconfig;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Disposes;
import jakarta.enterprise.inject.Produces;
import jakarta.persistence.*;


@ApplicationScoped
public class ConfigDb {

    @PersistenceUnit(unitName = "dbAcademia")
    private EntityManagerFactory entityManagerFactory;

    @PostConstruct
    public  void init(){
        entityManagerFactory = Persistence.createEntityManagerFactory("dbAcademia");
    }

    @Produces
    @ApplicationScoped
    public EntityManagerFactory emf(){
        return entityManagerFactory;
    }

    @Produces
    @ApplicationScoped
    public EntityManager em() {
        return emf().createEntityManager();
    }

    void closeEntityManager(@Disposes EntityManager em){
        if(em.isOpen()){
            em.close();
        }
    }

}
