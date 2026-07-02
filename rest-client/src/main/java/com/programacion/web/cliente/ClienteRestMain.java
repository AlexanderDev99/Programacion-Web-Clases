package com.programacion.web.cliente;


import com.programacion.web.cliente.dto.UserDto;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.GenericType;
import jakarta.ws.rs.core.MediaType;

import java.math.BigDecimal;
import java.util.List;

public class ClienteRestMain {

    public  static  final String USERS_URL = "http://localhost:8080/api/user";
    public static void main(String[] args) {

        var client = ClientBuilder.newClient();

        //definimos la direccion del recurso
        var user1 = client.target(USERS_URL)
                .path("/{id}")
                .resolveTemplate("id", 1)
                .request(MediaType.APPLICATION_JSON)
                .get(String.class);

        //mostrar el usuario
        System.out.println(user1);

        //totods los usuarios
        List<UserDto> users = client.target(USERS_URL)
                .request(MediaType.APPLICATION_JSON)
                .get(new GenericType<>() {});

        System.out.println(users);

        //-POST

        var idx = System.currentTimeMillis();
        var newUser = new UserDto();

        newUser.setName("Nuevo usuario" + idx);
        newUser.setUsername("newUser" + idx);
        newUser.setEmail("email.%d@gmail.com".formatted(idx));
        System.out.println(newUser);

        var response = client.target(USERS_URL)
                .request(MediaType.APPLICATION_JSON)
                //.post(Entity.entity(newUser, MediaType.APPLICATION_JSON))
                .post(Entity.json(newUser));
        System.out.println("STATUS: " + response.getStatus());

        //--PUT
//        var put = client.target(USERS_URL)
//                .path()


        //--DELETE
        var delete = client.target( USERS_URL)
                .path("/{id}")
                .resolveTemplate("id", 16)
                .request(MediaType.APPLICATION_JSON)
                .delete(String.class);

    }
}
