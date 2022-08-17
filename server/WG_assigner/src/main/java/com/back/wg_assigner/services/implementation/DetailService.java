package com.back.wg_assigner.services.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back.wg_assigner.entities.Detail;
import com.back.wg_assigner.repositories.DetailRepository;
import com.back.wg_assigner.services.interfaces.BaseCrudInterface;

@Service
public class DetailService implements BaseCrudInterface<Detail> {

	private DetailRepository repository;

	public DetailService(DetailRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<Detail> getAll() throws Exception {
		return repository.findAll();
	}

	@Override
	public Detail getById(Long id) throws Exception {
		return repository.findById(id).orElseThrow();
	}

	@Override
	public Detail save(Detail entity) throws Exception {
		entity.setId(null);
		entity.setDeleted(false);
		entity.setUpdated(null);
		entity.setCreated(null);
		return repository.save(entity);
	}

	@Override
	public Detail update(Detail entity, Long id) throws Exception {
		Detail detail = repository.findById(id).orElseThrow();
		entity.setId(id);
		entity.setDeleted(detail.isDeleted());
		entity.setUpdated(detail.getUpdated());
		entity.setCreated(detail.getCreated());
		return repository.save(entity);
	}

	@Override
	public void remove(Long id) throws Exception {
		repository.delete(repository.findById(id).orElseThrow());
	}
}
