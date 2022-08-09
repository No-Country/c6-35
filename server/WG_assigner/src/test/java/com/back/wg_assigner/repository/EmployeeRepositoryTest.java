package com.back.wg_assigner.repository;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.repositories.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class EmployeeRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private EmployeeRepository repository;

    @Test
    void saveEmployee(){
        Employee newEmployee = repository.save(Employee.builder()
                .name("diego")
                .lastname("example1")
                .direccion("Av. San Martin 230")
                .dni(1111111)
                .phone(261111111)
                .employeeId(3412).build());
        Employee employee = entityManager.find(Employee.class,newEmployee.getId());
        assertThat(employee.getName()).isEqualTo("diego");
        assertThat(employee.getLastname()).isEqualTo("example1");
        assertThat(employee.getDireccion()).isEqualTo("Av. San Martin 230");
        assertThat(employee.getDni()).isEqualTo(1111111);
        assertThat(employee.getPhone()).isEqualTo(261111111);
        assertThat(employee.getEmployeeId()).isEqualTo(3412);
        entityManager.remove(newEmployee);
    }
    @Test
    void findByIdEmployee(){
        Employee newEmployee = entityManager.persist(Employee.builder()
                .name("diego")
                .lastname("example1")
                .direccion("Av. San Martin 230")
                .dni(1111111)
                .phone(261111111)
                .employeeId(3412).build());
        Employee employee = repository.findById(newEmployee.getId()).get();
        assertThat(employee.getName()).isEqualTo("diego");
        assertThat(employee.getLastname()).isEqualTo("example1");
        assertThat(employee.getDireccion()).isEqualTo("Av. San Martin 230");
        assertThat(employee.getDni()).isEqualTo(1111111);
        assertThat(employee.getPhone()).isEqualTo(261111111);
        assertThat(employee.getEmployeeId()).isEqualTo(3412);
        entityManager.remove(newEmployee);
    }

    @Test
    void removeEmployee(){
        Employee newEmployeeTest = Employee.builder()
            .name("diego")
            .lastname("example1")
            .direccion("Av. San Martin 230")
            .dni(1111111)
            .phone(261111111)
            .employeeId(3412).build();
        Employee newEmployee = entityManager.persist(newEmployeeTest);

        repository.deleteById(newEmployee.getId());

        Employee employee = entityManager.find(Employee.class, newEmployee.getId());
        assertThat(employee).isNull();
    }

    @Test
    void listEmployee(){
        List<Employee> newEmployees =new ArrayList<>();
        newEmployees.add(Employee.builder()
                .name("diego")
                .lastname("example1")
                .direccion("Av. San Martin 230")
                .dni(1111111)
                .phone(261111111)
                .employeeId(3412).build());
        newEmployees.add(Employee.builder()
                .name("dexampleB")
                .lastname("example1")
                .direccion("Av. San Martin 230")
                .dni(1111111)
                .phone(261111111)
                .employeeId(3412).build());
        newEmployees.add(Employee.builder()
                .name("dexampleC")
                .lastname("example1")
                .direccion("Av. San Martin 230")
                .dni(1111111)
                .phone(261111111)
                .employeeId(3412).build());
        newEmployees.get(1).setDeleted(true);
        newEmployees.stream().forEach(e ->entityManager.persist(e));

        List<Employee> employees = repository.findAll();

        assertThat(employees.stream().count()).isEqualTo(2);
    }
}
