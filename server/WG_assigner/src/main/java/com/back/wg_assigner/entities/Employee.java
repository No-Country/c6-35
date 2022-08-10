package com.back.wg_assigner.entities;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "personal")
@SQLDelete(sql = "update personal SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data   //ges set
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Employee extends BaseEntity{
    @Column(name = "nombre")
    private String name;
    @Column(name = "apellido")
    private String lastname;
    @Column(name = "dni")
    private Integer dni;
    @Column(name = "celular")
    private Integer phone;
    @Column(name = "direccion")
    private String direccion;
    @Column(name = "legajo")
    private Integer employeeId;
}
