package com.back.wg_assigner.services.implementation;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.repositories.EmployeeRepository;
import com.back.wg_assigner.repositories.UserRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements BaseCrudInterface<Employee> {

    private EmployeeRepository repository;
    private UserRepository userRepository;

    public EmployeeService(EmployeeRepository repository, UserRepository userRepository){
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Employee> getAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public Employee getById(Long id) throws Exception {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public Employee save(Employee entity) throws Exception {
        entity.setId(null);
        entity.setDeleted(false);
        entity.setUpdated(null);
        entity.setCreated(null);
        if(entity.getUser() == null)
            throw new RuntimeException();
        if(userRepository.findUserByUserNameOrEmail(entity.getUser().getUserName(), entity.getUser().getEmail()).stream().count() > 0)
            throw new RuntimeException();
        entity.setUser(userRepository.save(entity.getUser()));
        return repository.save(entity);
    }

    @Override
    public Employee update(Employee entity, Long id) throws Exception {
        Employee employee = repository.findById(id).orElseThrow();
        entity.setId(id);
        entity.setDeleted(employee.isDeleted());
        entity.setUpdated(employee.getUpdated());
        entity.setCreated(employee.getCreated());
        return repository.save(entity);
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }
}
