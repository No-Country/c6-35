package com.back.wg_assigner.services.implementation;


import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.repositories.UserRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements BaseCrudInterface<User> {

    private UserRepository repository;

    private UserService(UserRepository repository){this.repository = repository;
    }
    @Override
    public List<User> getAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public User getById(Long id) throws Exception {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public User save(User entity) throws Exception {
        entity.setId(null);
        entity.setDeleted(false);
        entity.setUpdated(null);
        entity.setCreated(null);
        return repository.save(entity);
    }

    @Override
    public User update(User entity, Long id) throws Exception {
        User user = repository.findById(id).orElseThrow();
        entity.setId(id);
        entity.setDeleted(user.isDeleted());
        entity.setUpdated(user.getUpdated());
        entity.setCreated(user.getCreated());
        return repository.save(entity);
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }
}
