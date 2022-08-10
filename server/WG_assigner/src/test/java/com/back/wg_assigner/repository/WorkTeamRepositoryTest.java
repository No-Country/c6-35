package com.back.wg_assigner.repository;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.entities.TeamEmployee;
import com.back.wg_assigner.entities.WorkTeam;
import com.back.wg_assigner.repositories.WorkTeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class WorkTeamRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WorkTeamRepository repository;

    @Test
    void saveWorkTeam(){
        WorkTeam newTeam01 = WorkTeam.builder().code("L31").empleados(new ArrayList<TeamEmployee>()).build();
        newTeam01 = repository.save(newTeam01);
        WorkTeam team = entityManager.find(WorkTeam.class, newTeam01.getId());
        assertThat(team.getCode()).isEqualTo("L31");
        entityManager.remove(team);
    }

    @Test
    void WorkTeamUpdate(){
        //creamos un nuevo team y lo persistimos
        WorkTeam newTeam01 = WorkTeam.builder().code("L31").empleados(new ArrayList<TeamEmployee>()).build();
        newTeam01 = entityManager.persist(newTeam01);

        //empleado de prueba sin team
        Employee employee = entityManager.persist(Employee.builder()
                .name("diego")
                .lastname("example1")
                .direccion("Av. San Martin 230")
                .dni(1111111)
                .phone(261111111)
                .employeeId(3412).build());

        WorkTeam team = entityManager.find(WorkTeam.class, newTeam01.getId());
        assertThat(team.getEmpleados().stream().count()).isEqualTo(0);

        newTeam01.getEmpleados().add(new TeamEmployee(employee));
        repository.save(newTeam01);

        team = entityManager.find(WorkTeam.class, newTeam01.getId());
        assertThat(team.getEmpleados().stream().count()).isEqualTo(1);
        assertThat((Employee) team.getEmpleados().get(0)).isEqualTo(employee);
    }

    @Test
    void WorkTeamDeleteTest(){
        WorkTeam newTeam = WorkTeam.builder()
                .code("1234").build();
        newTeam = entityManager.persist(newTeam);

        repository.deleteById(newTeam.getId());

        WorkTeam workTeam = entityManager.find(WorkTeam.class, newTeam.getId());
        assertThat(workTeam).isNull();
    }

    @Test
    void WorkTeamIsDeleteTest(){
        WorkTeam newTeam = WorkTeam.builder()
                .code("1234").build();
        newTeam.setDeleted(true);
        entityManager.persist(newTeam);

        List<WorkTeam> workTeams = repository.findAll();
        assertThat(workTeams.stream().count()).isEqualTo(0);
    }
}
