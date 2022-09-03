package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "direccion")
@Inheritance(strategy= InheritanceType.JOINED)
@SQLDelete(sql = "update direcciom SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address extends BaseEntity{
    @OneToMany
    @Column(name = "municipalidad")
    private Municipalities municipalities;
    @OneToMany
    @Column(name = "localidad")
    private Locality locality;
    @Column(name = "calle")
    private String street;
    @Column(name = "altura")
    private String number;
}