package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "localidad")
@Inheritance(strategy= InheritanceType.JOINED)
@SQLDelete(sql = "update localidad SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Locality extends BaseEntity{
    @Column(name = "localidad")
    private String nombre;
    @OneToMany
    @Column(name = "municipio")
    private Municipalities municipalities;
}

