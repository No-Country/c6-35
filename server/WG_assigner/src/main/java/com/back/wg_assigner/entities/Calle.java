package com.back.wg_assigner.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "calles")
public class Calle {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "denominacion", length = 45)
    private String denominacion;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

}