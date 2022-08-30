package com.back.wg_assigner.services.implementation;

import com.back.wg_assigner.entities.Employee;
import com.back.wg_assigner.entities.Rol;
import com.back.wg_assigner.repositories.EmployeeRepository;
import com.back.wg_assigner.repositories.RolRepository;
import com.back.wg_assigner.repositories.UserRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.HttpURLConnection;
import java.util.List;

@Service
public class EmployeeService implements BaseCrudInterface<Employee> {

    private EmployeeRepository repository;
    private UserRepository userRepository;

    private RolRepository rolRepository;

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
        Employee employee;
        employee = repository.findById(id).orElseThrow(()->
            new ResponseStatusException(HttpStatus.NOT_FOUND,"Empleado no encontrado")
        );
        return employee;
    }

    @Override
    public Employee save(Employee entity) throws Exception {
        entity.setId(null);
        entity.setDeleted(false);
        entity.setUpdated(null);
        entity.setCreated(null);
        if(entity.getUser() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"dato de usuario faltantes");
        if(userRepository.findUserByUserNameOrEmail(entity.getUser().getUserName(), entity.getUser().getEmail()).stream().count() > 0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"usuario existente");
        if(entity.getUser().getRol() == null && entity.getUser().getRol().getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"rol no asignado");
        Rol rol = rolRepository.findById(entity.getUser().getRol().getId()).orElseThrow(()->
            new ResponseStatusException(HttpStatus.BAD_REQUEST,"No se encuentra el rol asignado")
        );
        entity.getUser().setRol(rol);
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
        entity.getUser().setPassword(employee.getUser().getPassword());
        Rol rol = rolRepository.findById(entity.getUser().getRol().getId()).orElseThrow();
        entity.getUser().setRol(rol);
        entity.setUser(userRepository.save(entity.getUser()));
        return repository.save(entity);
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }
}
