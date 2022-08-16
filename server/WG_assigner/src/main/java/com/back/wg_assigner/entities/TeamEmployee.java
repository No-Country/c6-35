package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "empleados_cuadrilla")
@PrimaryKeyJoinColumn(name="employeeId")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamEmployee extends Employee{
    @ManyToOne()
    @JoinColumn(name = "cuadrillaId")
    private WorkTeam workTeam;

    public TeamEmployee(Employee employee){
        setId(employee.getId());
        setName(employee.getName());
        setLastname(employee.getLastname());
        setDni(employee.getDni());
        setPhone(employee.getPhone());
        setDireccion(employee.getDireccion());
        setEmployeeId(employee.getEmployeeId());
    }
}
