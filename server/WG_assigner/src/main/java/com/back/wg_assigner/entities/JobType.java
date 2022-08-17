package com.back.wg_assigner.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tipos_de_trabajo")
@Inheritance(strategy=InheritanceType.JOINED)
@SQLDelete(sql = "update tipos_de_trabajo SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobType extends BaseEntity {

	@Column(name = "denominacion", length = 45)
	private String denominacion;

}