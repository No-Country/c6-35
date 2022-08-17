package com.back.wg_assigner.entities;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AddressesId implements Serializable {
    private static final long serialVersionUID = 5949607162507695536L;
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "municipio_id", nullable = false)
    private Integer municipioId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMunicipioId() {
        return municipioId;
    }

    public void setMunicipioId(Integer municipioId) {
        this.municipioId = municipioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AddressesId entity = (AddressesId) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.municipioId, entity.municipioId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, municipioId);
    }

}