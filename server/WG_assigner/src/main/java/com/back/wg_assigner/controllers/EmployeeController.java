package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.services.implementation.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Repository
@RequestMapping("/employee")
public class EmployeeController implements BaseCRUDController<Employee> {

    private EmployeeService service;

    public EmployeeController(EmployeeService service){
        this.service = service;
    }

    @GetMapping
    @Override
    public ResponseEntity<List<Employee>> getAll() throws Exception {
        return ResponseEntity.ok(this.service.getAll());
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Employee> findById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(this.service.getById(id));
    }

    @PostMapping("/{id}")
    @Override
    public ResponseEntity<Employee> save(Employee model) throws Exception {
        return ResponseEntity.ok(this.service.save(model));
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Employee> update(@RequestBody Employee model, @PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(this.service.update(model,id));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        this.service.remove(id);
        return ResponseEntity.ok("");
    }
}
