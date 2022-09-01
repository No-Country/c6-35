package com.back.wg_assigner.services.implementation;


import com.back.wg_assigner.entities.Rol;
import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.repositories.RolRepository;
import com.back.wg_assigner.repositories.UserRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class RolService implements BaseCrudInterface<Rol> {

    private RolRepository repository;

    @Override
    public List<Rol> getAll() throws Exception {
        return StreamSupport.stream(repository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @Override
    public Rol getById(Long id) throws Exception {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Rol save(Rol entity) throws Exception {
        entity.setId(null);
        entity.setDeleted(false);
        entity.setUpdated(null);
        entity.setCreated(null);
        return repository.save(entity);
    }

    @Override
    public Rol update(Rol entity, Long id) throws Exception {
        Rol rol = repository.findById(id).orElseThrow();
        entity.setId(id);
        entity.setDeleted(rol.isDeleted());
        entity.setUpdated(rol.getUpdated());
        entity.setCreated(rol.getCreated());
        return repository.save(entity);
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }
}


