package com.back.wg_assigner.services.implementation;


import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.repositories.UserRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService implements BaseCrudInterface<User> {

    private UserRepository repository;

    private UserService(UserRepository repository){this.repository = repository;
    }
    @Override
    public List<User> getAll() throws Exception {
        return StreamSupport.stream(repository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    public List<User> listByPage(int page, int size ) throws Exception {
        Pageable pageable = PageRequest.of(page, size);
        return StreamSupport.stream(repository.findAll(pageable).spliterator(), false).collect(Collectors.toList());
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
