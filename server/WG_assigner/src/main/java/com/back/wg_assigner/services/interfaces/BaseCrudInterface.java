package com.back.wg_assigner.services.interfaces;

import com.back.wg_assigner.entities.BaseEntity;

import java.util.List;

public interface BaseCrudInterface <T extends BaseEntity>{
    public List<T> getAll() throws Exception;

    public T getById(Long id) throws Exception;

    public T save(T entity) throws Exception;

    public T update(T entity, Long id) throws Exception;

    public void remove(Long id) throws Exception;
}
