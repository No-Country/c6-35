package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "estado")
@Inheritance(strategy= InheritanceType.JOINED)
@SQLDelete(sql = "update estado SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class State extends BaseEntity {
    @Column(name = "nombre")
    private String nombre;

}
