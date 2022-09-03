package com.back.wg_assigner.controllers;


import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.services.implementation.UserService;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;
@Repository
@RequestMapping("/user")
public class UserController implements BaseCRUDController<User>{

    private UserService service;

    private final int PAGE_SIZE = 10;

    public UserController(UserService service){this.service = service;}


    @Override
    public ResponseEntity<List<User>> getAll() throws Exception {
        return ResponseEntity.ok(this.service.getAll());
    }
    @GetMapping(params = {"page"})
    public ResponseEntity<List<User>> lisAllByPage(@RequestParam(name = "page") Integer page) throws Exception {
        return ResponseEntity.ok(this.service.listByPage(page, PAGE_SIZE ));
    }


    @GetMapping("/{id}")
    @Override
    public ResponseEntity<User> findById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(this.service.getById(id));
    }
    @PostMapping()
    @Override
    public ResponseEntity<User> save(@RequestBody User model) throws Exception {
        return ResponseEntity.ok(this.service.save(model));
    }
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<User> update( @RequestBody User model, @PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(this.service.update(model,id));
    }
    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        this.service.remove(id);
        return ResponseEntity.ok("");
    }


    @Data
    @Builder
    public static class UserDto implements Serializable {
        private Long id;
        private String userName;
        private String email;
        private String password;
        private RolDto rol;
    }

    @Data
    @Builder
    public static class RolDto implements Serializable{
        private Long id;
        private String denomination;
        private String  description;
    }
}
