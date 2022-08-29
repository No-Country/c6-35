package com.back.wg_assigner.services.implementation;

import com.back.wg_assigner.entities.BaseEntity;
import com.back.wg_assigner.entities.WorkTeam;
import com.back.wg_assigner.repositories.WorkTeamRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
public class WorkTeamService implements BaseCrudInterface<WorkTeam> {

    private WorkTeamRepository repository;

    public WorkTeamService(WorkTeamRepository workTeamRepository){
        this.repository = workTeamRepository;
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
        return repository.save(entity);
    }

    @Override
    public WorkTeam update(WorkTeam entity, Long id) throws Exception {
        BaseEntity workTeam = repository.findById(id).orElseThrow();
        entity.setId(id);
        entity.setDeleted(workTeam.isDeleted());
        entity.setUpdated(workTeam.getUpdated());
        entity.setCreated(workTeam.getCreated());
        return repository.save(entity);
    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }
}
