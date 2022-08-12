package com.back.wg_assigner.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "Rol")
@SQLDelete(sql = "update Users SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data   //ges set
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Rol  extends BaseEntity {
    @Column(name = "denomination")
    private String denomination;
    @Column(name = "description")
    private String  description;
    @OneToMany
    private List<User> users;
}
