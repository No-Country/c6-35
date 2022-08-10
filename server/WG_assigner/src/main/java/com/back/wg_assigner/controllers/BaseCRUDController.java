package com.back.wg_assigner.controllers;

import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.List;

public interface BaseCRUDController <T extends Serializable>{
    public ResponseEntity<List<T>> getAll() throws Exception;
    public ResponseEntity<T> findById(Long id) throws Exception;

    public ResponseEntity<T> save(T model) throws Exception;
    public ResponseEntity<T> update(T model, Long id) throws Exception;
    public ResponseEntity<?> delete(Long id) throws Exception;
}
