package com.back.wg_assigner.services.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back.wg_assigner.entities.JobType;
import com.back.wg_assigner.repositories.JobTypeRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;

@Service
public class JobTypeService implements BaseCrudInterface<JobType> {

	private JobTypeRepository repository;

	public JobTypeService(JobTypeRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<JobType> getAll() throws Exception {
		return repository.findAll();
	}

	@Override
	public JobType getById(Long id) throws Exception {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public JobType save(JobType entity) throws Exception {
		entity.setId(null);
		entity.setDeleted(false);
		entity.setUpdated(null);
		entity.setCreated(null);
		return repository.save(entity);
	}

	@Override
	public JobType update(JobType entity, Long id) throws Exception {
		JobType JobType = repository.findById(id).orElseThrow();
		entity.setId(id);
		entity.setDeleted(JobType.isDeleted());
		entity.setUpdated(JobType.getUpdated());
		entity.setCreated(JobType.getCreated());
		return repository.save(entity);
	}

	@Override
	public void remove(Long id) throws Exception {
		repository.delete(repository.findById(id).orElseThrow());
	}
}
