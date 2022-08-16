package com.back.wg_assigner.repository;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.entities.Rol;
import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private UserRepository repository;

    @Test
    void saveUser(){
        User newUser = repository.save(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol( Rol.builder().denomination("Empleado").description("tecnico en refrigeracion de materiales").build()).build());
        User user = entityManager.find(User.class,newUser.getId());
        assertThat(user.getUserName()).isEqualTo("Andres");
        assertThat(user.getEmail()).isEqualTo("andres@gmail.com");
        assertThat(user.getPassword()).isEqualTo("qwerty");
        assertThat(user.getRol()).isEqualTo("Empleado").isEqualTo("tecnico en refrigeracion de materiales");
        entityManager.remove(newUser);

    }

    @Test
    void findByIdUser(){
        User newUser = entityManager.persist(User.builder()
                        .userName("Andres")
                        .email("andres@gmail.com")
                        .password("qwerty")
                        .rol( Rol.builder().denomination("Empleado").description("tecnico en refrigeracion de materiales").build()).build());
        User user = entityManager.find(User.class,newUser.getId());
        assertThat(user.getUserName()).isEqualTo("Andres");
        assertThat(user.getEmail()).isEqualTo("andres@gmail.com");
        assertThat(user.getPassword()).isEqualTo("qwerty");
        assertThat(user.getRol()).isEqualTo("Empleado").isEqualTo("tecnico en refrigeracion de materiales");
        entityManager.remove(newUser);
    }

    @Test
    void removeUser(){
        User newUser = entityManager.persist(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol( Rol.builder().denomination("Empleado").description("tecnico en refrigeracion de materiales").build()).build());
        User newUser = entityManager.persist(newUserTest);

        repository.deleteById(newUser.getId());

        User user = entityManager.find(User.class, newUser.getId());
        assertThat(user).isNull();
    }
    @Test
    void listUser(){
        List<User> newUser =new ArrayList<>();
        newUser.add(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol( Rol.builder().denomination("Empleado").description("tecnico en refrigeracion de materiales").build()).build());
        newUser.add(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol( Rol.builder().denomination("Empleado").description("tecnico en refrigeracion de materiales").build()).build());
        newUser.add(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol( Rol.builder().denomination("Empleado").description("tecnico en refrigeracion de materiales").build()).build());
        newUser.get(1).setDeleted(true);
        newUser.stream().forEach(e ->entityManager.persist(e));

        List<User> user = repository.findAll();

        assertThat(user.stream().count()).isEqualTo(2);
    }
}
