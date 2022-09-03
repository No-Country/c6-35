package com.back.wg_assigner.services.implementation;

import com.back.wg_assigner.entities.*;
import com.back.wg_assigner.repositories.WorkOrderRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class WorkOrderService implements BaseCrudInterface<WorkOrder> {

    private WorkOrderRepository repository;


    public WorkOrderService(WorkOrderRepository workOrderRepository){
        this.repository = workOrderRepository;
    }

    @Override
    public List<WorkOrder> getAll() throws Exception {
        return repository.findAll();
    }

    @Override
    public WorkOrder getById(Long id) throws Exception {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public WorkOrder save(WorkOrder entity) throws Exception {
        entity.setId(null);
        entity.setDeleted(false);
        entity.setUpdated(null);
        entity.setCreated(null);
        if(entity.getAddress() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"dato de direccion faltante");
        if(entity.getObservacion() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"dato de observacion faltante");
        if(entity.getTypeOfWork() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"dato de tipo de trabajo faltante");
        if(entity.getState() == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"dato de estado faltante");
        return repository.save(entity);
    }

    @Override
    public WorkOrder update(WorkOrder entity, Long id) throws Exception {
        WorkOrder workOrder = repository.findById(id).orElseThrow();
        entity.setId(id);
        entity.setDeleted(workOrder.isDeleted());
        entity.setUpdated(workOrder.getUpdated());
        entity.setCreated(workOrder.getCreated());
        entity.setObservacion(workOrder.getObservacion());
        entity.setAddress(workOrder.getAddress());
        entity.setTypeOfWork(workOrder.getTypeOfWork());
        entity.setState(workOrder.getState());
        return repository.save(entity);

    }

    @Override
    public void remove(Long id) throws Exception {
        repository.delete(repository.findById(id).orElseThrow());
    }

}
