package com.back.wg_assigner.services.implementation;

import com.back.wg_assigner.entities.BaseEntity;
import com.back.wg_assigner.entities.TeamEmployee;
import com.back.wg_assigner.entities.WorkTeam;
import com.back.wg_assigner.repositories.EmployeeRepository;
import com.back.wg_assigner.repositories.TeamEmployeeRepository;
import com.back.wg_assigner.repositories.WorkTeamRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkTeamService implements BaseCrudInterface<WorkTeam> {

    private WorkTeamRepository repository;
    private EmployeeRepository repositoryEmployee;
    private TeamEmployeeRepository teamEmployeeRepository;

    public WorkTeamService(WorkTeamRepository workTeamRepository, EmployeeRepository repositoryEmployee, TeamEmployeeRepository teamEmployeeRepository){
        this.repository = workTeamRepository;
        this.repositoryEmployee = repositoryEmployee;
        this.teamEmployeeRepository = teamEmployeeRepository;
    }

    @Override
    public List<WorkTeam> getAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public WorkTeam getById(Long id) throws Exception {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public WorkTeam save(WorkTeam entity) throws Exception {
        entity.setId(null);
        entity.setDeleted(false);
        entity.setUpdated(null);
        entity.setCreated(null);
        List<TeamEmployee> teamEmployees = entity.getEmpleados().stream().map((e)->new TeamEmployee(repositoryEmployee.findById(e.getId()).get())).collect(Collectors.toList());
        entity.setEmpleados(teamEmployees);
        WorkTeam team = repository.save(entity);
        teamEmployeeRepository.saveAll(teamEmployees.stream().map((e)->{e.setWorkTeam(team); return e;}).collect(Collectors.toList()));
        return team;
    }

    @Override
    public WorkTeam update(WorkTeam entity, Long id) throws Exception {
        BaseEntity workTeam = repository.findById(id).orElseThrow();
        entity.setId(id);
        entity.setDeleted(workTeam.isDeleted());
        entity.setUpdated(workTeam.getUpdated());
        entity.setCreated(workTeam.getCreated());
        List<TeamEmployee> teamEmployees = entity.getEmpleados().stream().map((e)->new TeamEmployee(repositoryEmployee.findById(e.getId()).get())).collect(Collectors.toList());
        entity.setEmpleados(teamEmployees);
        WorkTeam team = repository.save(entity);
        teamEmployeeRepository.saveAll(teamEmployees.stream().map((e)->{e.setWorkTeam(team); return e;}).collect(Collectors.toList()));
        return team;
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }
}
