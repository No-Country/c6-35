package com.back.wg_assigner.entities;

import javax.persistence.*;

@Entity
@Table(name = "orden_de_trabajo")
public class OrdenDeTrabajo extends BaseEntity {
	@Id
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "observacion", length = 45)
	private String observacion;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "direccion_id", nullable = false, referencedColumnName = "direccion_id")
	private Addresses direccion;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "tipo_trabajo_id", nullable = false)
	private JobType tipoTrabajo;

	@Column(name = "codigo", length = 45)
	private String codigo;

}