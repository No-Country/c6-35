package com.back.wg_assigner.services.implementation;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.repositories.EmployeeRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements BaseCrudInterface<Employee> {

    private EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository){
        this.repository = repository;
    }

    @Override
    public List<Employee> getAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public Employee getById(Long id) throws Exception {
        return repository.getReferenceById(id);
    }

    @Override
    public Employee save(Employee entity) throws Exception {
        return repository.save(entity);
    }

    @Override
    public Employee update(Employee entity, Long id) throws Exception {
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.getReferenceById(id));
    }
}
