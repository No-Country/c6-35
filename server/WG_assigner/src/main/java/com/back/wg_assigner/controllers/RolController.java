package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.Rol;
import com.back.wg_assigner.services.implementation.RolService;
import com.back.wg_assigner.services.implementation.WorkTeamService;
import lombok.AllArgsConstructor;
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
@RequestMapping("/rol")
@AllArgsConstructor
public class RolController implements BaseCRUDController<RolController.RolDto> {

    private RolService service;

    @GetMapping
    @Override
    public ResponseEntity<List<RolDto>> getAll() throws Exception {
        return ResponseEntity.ok(service.getAll().stream().map(RolController::toRolDto).collect(Collectors.toList()));
    }
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<RolDto> findById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(toRolDto(service.getById(id)));
    }

    @PostMapping()
    @Override
    public ResponseEntity<RolDto> save(@RequestBody RolDto model) throws Exception {
        return ResponseEntity.ok(toRolDto(service.save(toRol(model))));
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<RolDto> update(@RequestBody RolDto model,@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(toRolDto(service.save(toRol(model))));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        service.remove(id);
        return ResponseEntity.ok("");
    }

    public static RolDto toRolDto(Rol rol){
        return RolDto.builder()
                .id(rol.getId())
                .denomination(rol.getDenomination())
                .description(rol.getDescription())
                .build();
    }

    public static Rol toRol(RolDto rolDto){
        Rol rol = Rol.builder()
                .denomination(rolDto.getDenomination())
                .description(rolDto.getDescription())
                .build();
        rol.setId(rolDto.getId());
        rol.setUsers(new ArrayList<>());
        return rol;
    }

    @Data
    @Builder
    public static class RolDto implements Serializable {
        private Long id;
        private String denomination;
        private String  description;
    }
}
