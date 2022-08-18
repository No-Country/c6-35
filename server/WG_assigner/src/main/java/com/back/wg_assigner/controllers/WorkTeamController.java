package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.WorkTeam;
import com.back.wg_assigner.services.implementation.WorkTeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Repository
@RequestMapping("/workTeam")
public class WorkTeamController implements BaseCRUDController<WorkTeam> {

    private WorkTeamService service;

    public WorkTeamController(WorkTeamService service){
        this.service = service;
    }

    @GetMapping
    @Override
    public ResponseEntity<List<WorkTeam>> getAll() throws Exception {
        return ResponseEntity.ok(this.service.getAll());
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<WorkTeam> findById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(this.service.getById(id));
    }

    @PostMapping()
    @Override
    public ResponseEntity<WorkTeam> save(@RequestBody WorkTeam model) throws Exception {
        return ResponseEntity.ok(this.service.save(model));
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<WorkTeam> update(@RequestBody WorkTeam model, @PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(this.service.update(model,id));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        this.service.remove(id);
        return ResponseEntity.ok("");
    }

}
