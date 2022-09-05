package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "municipalidad")
@Inheritance(strategy= InheritanceType.JOINED)
@SQLDelete(sql = "update municipalidad SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Municipalities extends BaseEntity{
    @Column(name = "municipio")
    private String nombre;
    @OneToMany(mappedBy = "municipality")
    private List<Locality> localities;
    @OneToMany(mappedBy = "municipality")
    private List<Address> addresses;
}