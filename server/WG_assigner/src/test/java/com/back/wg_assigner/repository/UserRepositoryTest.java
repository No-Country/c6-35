package com.back.wg_assigner.repository;

import com.back.wg_assigner.entities.Rol;
import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;
    @Autowired
    private UserRepository repository;
    private Rol rolTest;

    @BeforeEach
    void beforeAll(){
        Rol newRolTest = Rol.builder()
                .denomination("Empleado")
                .description("tecnico en refrigeracion de materiales")
                .build();
        rolTest = entityManager.persist(newRolTest);
    }

    @Test
    void saveUser(){

        User newUser = repository.save(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol(rolTest).build());
        User user = entityManager.find(User.class,newUser.getId());
        assertThat(user.getUserName()).isEqualTo("Andres");
        assertThat(user.getEmail()).isEqualTo("andres@gmail.com");
        assertThat(user.getPassword()).isEqualTo("qwerty");
        assertThat(user.getRol().getDenomination()).isEqualTo("Empleado");
        assertThat(user.getRol().getDescription()).isEqualTo("tecnico en refrigeracion de materiales");
        entityManager.remove(newUser);

    }

    @Test
    void findByIdUser(){
        User newUser = entityManager.persist(User.builder()
                        .userName("Andres")
                        .email("andres@gmail.com")
                        .password("qwerty")
                        .rol(rolTest).build());
        User user = entityManager.find(User.class,newUser.getId());
        assertThat(user.getUserName()).isEqualTo("Andres");
        assertThat(user.getEmail()).isEqualTo("andres@gmail.com");
        assertThat(user.getPassword()).isEqualTo("qwerty");
        assertThat(user.getRol().getDenomination()).isEqualTo("Empleado");
        assertThat(user.getRol().getDescription()).isEqualTo("tecnico en refrigeracion de materiales");
        entityManager.remove(newUser);
    }

    @Test
    void removeUser(){
        User newUserTest = entityManager.persist(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol(rolTest).build());
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
                .rol(rolTest).build());
        newUser.add(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol(rolTest).build());
        newUser.add(User.builder()
                .userName("Andres")
                .email("andres@gmail.com")
                .password("qwerty")
                .rol(rolTest).build());
        newUser.get(1).setDeleted(true);
        newUser.stream().forEach(e ->entityManager.persist(e));

        List<User> user = StreamSupport.stream(repository.findAll().spliterator(), false).collect(Collectors.toList());

        assertThat(user.stream().count()).isEqualTo(2);
    }
}
