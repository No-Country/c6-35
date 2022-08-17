package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.JobType;
import com.back.wg_assigner.entities.JobType;
import com.back.wg_assigner.services.implementation.JobTypeService;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Repository
@RequestMapping("/JobType")
public class JobTypeController implements BaseCRUDController<JobType> {

	private JobTypeService service;

	public JobTypeController(JobTypeService service) {
		this.service = service;
	}

	@GetMapping
	@Override
	public ResponseEntity<List<JobType>> getAll() throws Exception {
		return ResponseEntity.ok(this.service.getAll());
	}

	@GetMapping("/{id}")
	@Override
	public ResponseEntity<JobType> findById(@PathVariable("id") Long id) throws Exception {
		return ResponseEntity.ok(this.service.getById(id));
	}

	@PostMapping()
	@Override
	public ResponseEntity<JobType> save(@RequestBody JobType model) throws Exception {
		return ResponseEntity.ok(this.service.save(model));
	}

	@PutMapping("/{id}")
	@Override
	public ResponseEntity<JobType> update(@RequestBody JobType model, @PathVariable("id") Long id) throws Exception {
		return ResponseEntity.ok(this.service.update(model, id));
	}

	@DeleteMapping("/{id}")
	@Override
	public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
		this.service.remove(id);
		return ResponseEntity.ok("");
	}
}
