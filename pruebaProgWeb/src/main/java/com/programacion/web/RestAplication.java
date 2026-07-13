package com.programacion.web;

import com.programacion.web.services.CursoRest;
import com.programacion.web.services.EstudianteRest;
import com.programacion.web.services.MatriculaRest;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.Set;

@ApplicationPath("/api")
public class RestAplication extends Application {

    @Override
    public Set<Class<?>> getClasses(){
        return Set.of(
                EstudianteRest.class,
                CursoRest.class,
                MatriculaRest.class,
                CorsFilter.class
        );
    }
}
