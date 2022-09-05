package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cuadrillas")
@SQLDelete(sql = "update cuadrillas SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkTeam extends BaseEntity{
    @Column(name = "codigo")
    private String code;
    @OneToMany(mappedBy = "workTeam")
    private List<TeamEmployee> empleados = new ArrayList<>();
}
