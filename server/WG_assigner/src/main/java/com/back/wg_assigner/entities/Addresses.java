package com.back.wg_assigner.entities;

import javax.persistence.*;

@Entity
@Table(name = "direcciones")
public class Addresses {
    @EmbeddedId
    private AddressesId id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "direccion_id", nullable = false)
    private Calle direccion;

    @Column(name = "coordenadas", length = 20)
    private String coordenadas;

    public AddressesId getId() {
        return id;
    }

    public void setId(AddressesId id) {
        this.id = id;
    }

    public Calle getDireccion() {
        return direccion;
    }

    public void setDireccion(Calle direccion) {
        this.direccion = direccion;
    }

    public String getCoordenadas() {
        return coordenadas;
    }

    public void setCoordenadas(String coordenadas) {
        this.coordenadas = coordenadas;
    }

}