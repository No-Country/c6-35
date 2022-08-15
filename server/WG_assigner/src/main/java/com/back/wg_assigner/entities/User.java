package com.back.wg_assigner.entities;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Table(name = "Users")
@SQLDelete(sql = "update Users SET deleted = 1 where ID=?")
@Where(clause = "deleted <> 1")
@Data   //ges set
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User  extends BaseEntity{
    @Column(name = "nombre")
    private String userName;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "rol")
    @ManyToOne
    private Rol rol;
}
