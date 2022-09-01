package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.BaseEntity;
import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.entities.Rol;
import com.back.wg_assigner.entities.User;
import com.back.wg_assigner.services.implementation.EmployeeService;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequestMapping("/employee")
public class EmployeeController implements BaseCRUDController<EmployeeController.EmployeeDto> {

    private EmployeeService service;

    public EmployeeController(EmployeeService service){
        this.service = service;
    }

    @GetMapping
    @Override
    public ResponseEntity<List<EmployeeDto>> getAll() throws Exception {
        return ResponseEntity.ok(this.service.getAll().stream().map(EmployeeController::toEmployeeDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<EmployeeDto> findById(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(toEmployeeDto(this.service.getById(id)));
    }

    @PostMapping()
    @Override
    public ResponseEntity<EmployeeDto> save(@RequestBody EmployeeDto model) throws Exception {
        return ResponseEntity.ok(toEmployeeDto(this.service.save(toEmployee(model))));
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<EmployeeDto> update(@RequestBody EmployeeDto model, @PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(toEmployeeDto(this.service.update(toEmployee(model),id)));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
        this.service.remove(id);
        return ResponseEntity.ok("");
    }


    public static EmployeeDto toEmployeeDto(Employee employee){
        return EmployeeDto.builder()
                .id(employee.getId())
                .employeeId(employee.getEmployeeId())
                .name(employee.getName())
                .lastname(employee.getLastname())
                .dni(employee.getDni())
                .phone(employee.getPhone())
                .direccion(employee.getDireccion())
                .user(
                        UserDto.builder()
                        .id(employee.getUser().getId())
                        .userName(employee.getUser().getUserName())
                        .email(employee.getUser().getEmail())
                        .rol(RolController.RolDto.builder().id(employee.getUser().getRol().getId()).build())
                        .build()
                ).build();
    }

    public static Employee toEmployee(EmployeeDto employee){
        Employee employeeEntity = Employee.builder()
                .employeeId(employee.getEmployeeId())
                .name(employee.getName())
                .lastname(employee.getLastname())
                .dni(employee.getDni())
                .phone(employee.getPhone())
                .direccion(employee.getDireccion())
                .user((employee.getUser() != null)?
                        User.builder()
                                .userName(employee.getUser().getUserName())
                                .email(employee.getUser().getEmail())
                                .rol(Rol.builder().build())
                                .password(employee.getUser().getPassword())
                                .build():User.builder().build()
                ).build();
        employeeEntity.setId(employee.getId());
        if(employee.getUser() != null){
            employeeEntity.getUser().setId(employee.getUser().getId());
            if(employee.getUser().getRol() != null){
                employeeEntity.getUser().getRol().setId(employee.getUser().getRol().getId());
                employeeEntity.getUser().getRol().setDenomination(employee.getUser().getRol().getDenomination());
                employeeEntity.getUser().getRol().setDescription(employee.getUser().getRol().getDescription());
            }
        }
        return employeeEntity;
    }

    @Data
    @Builder
    public static class UserDto implements Serializable {
        private Long id;
        private String userName;
        private String email;
        private String password;
        private RolController.RolDto rol;
    }

    @Data
    @Builder
    public static class EmployeeDto implements Serializable{
        private Long id;
        private String name;
        private String lastname;
        private Integer dni;
        private Long phone;
        private String direccion;
        private Integer employeeId;
        private UserDto user;
    }

}
