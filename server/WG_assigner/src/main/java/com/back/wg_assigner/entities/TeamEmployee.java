package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
        super(employee.getName(), employee.getLastname(), employee.getDni(), employee.getPhone(), employee.getDireccion(), employee.getEmployeeId());
        setId(employee.getId());
    }
}
