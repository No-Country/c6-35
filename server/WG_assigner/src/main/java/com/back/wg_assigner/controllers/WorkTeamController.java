package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.TeamEmployee;
import com.back.wg_assigner.entities.WorkTeam;
import com.back.wg_assigner.services.implementation.WorkTeamService;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequestMapping("/workTeam")
public class WorkTeamController implements BaseCRUDController<WorkTeamController.WorkTeamDto> {

    private WorkTeamService service;

    public WorkTeamController(WorkTeamService service){
        this.service = service;
    }

    @GetMapping
    @Override
    public ResponseEntity<List<WorkTeamDto>> getAll() throws Exception {
        return ResponseEntity.ok(this.service.getAll().stream().map(WorkTeamController::toWorkTeamDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<WorkTeamDto> findById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(WorkTeamController.toWorkTeamDto(this.service.getById(id)));
    }

    @PostMapping()
    @Override
    public ResponseEntity<WorkTeamDto> save(@RequestBody WorkTeamDto model) throws Exception {
        return ResponseEntity.ok(WorkTeamController.toWorkTeamDto(this.service.save(WorkTeamController.toWorkTeam(model))));
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<WorkTeamDto> update(@RequestBody WorkTeamDto model, @PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(WorkTeamController.toWorkTeamDto(this.service.update(WorkTeamController.toWorkTeam(model),id)));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        this.service.remove(id);
        return ResponseEntity.ok("");
    }

    public static WorkTeamDto toWorkTeamDto(WorkTeam workTeam){
        return WorkTeamDto.builder()
                .id(workTeam.getId())
                .code(workTeam.getCode())
                .employees(workTeam.getEmpleados().stream().map(EmployeeController::toEmployeeDto).collect(Collectors.toList()))
                .build();
    }

    public static WorkTeam toWorkTeam(WorkTeamDto workTeamDto){
        return WorkTeam.builder()
                .code(workTeamDto.getCode())
                .empleados(workTeamDto.getEmployees().stream()
                        .map(EmployeeController::toEmployee)
                        .map(TeamEmployee::new).collect(Collectors.toList()))
                .build();
    }


    @Data
    @Builder
    public static class WorkTeamDto implements Serializable {
        private Long id;
        private String code;
        private List<EmployeeController.EmployeeDto> employees = new ArrayList<>();
    }
}
