package com.back.wg_assigner.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "ordendetrabajo")
@Inheritance(strategy= InheritanceType.JOINED)
@SQLDelete(sql = "update ordendetrabajo SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkOrder extends BaseEntity{
    @Column(name = "observacion")
    private String observacion;
    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
    @ManyToOne
    @JoinColumn(name = "typeofwork_id")
    private TypeOfWork typeOfWork;
    @OneToOne
    private State state;
}
