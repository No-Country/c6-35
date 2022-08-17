package com.back.wg_assigner.controllers;

import com.back.wg_assigner.entities.Detail;
import com.back.wg_assigner.entities.Detail;
import com.back.wg_assigner.services.implementation.DetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Repository
@RequestMapping("/detail")
public class DetailController implements BaseCRUDController<Detail> {

	private DetailService service;

	public DetailController(DetailService service) {
		this.service = service;
	}	

	@GetMapping
	@Override
	public ResponseEntity<List<Detail>> getAll() throws Exception {
		return ResponseEntity.ok(this.service.getAll());
	}

	@GetMapping("/{id}")
	@Override
	public ResponseEntity<Detail> findById(@PathVariable("id") Long id) throws Exception {
		return ResponseEntity.ok(this.service.getById(id));
	}

	@PostMapping()
	@Override
	public ResponseEntity<Detail> save(@RequestBody Detail model) throws Exception {
		return ResponseEntity.ok(this.service.save(model));
	}

	@PutMapping("/{id}")
	@Override
	public ResponseEntity<Detail> update(@RequestBody Detail model, @PathVariable("id") Long id) throws Exception {
		return ResponseEntity.ok(this.service.update(model, id));
	}

	@DeleteMapping("/{id}")
	@Override
	public ResponseEntity<?> delete(@PathVariable("id") Long id) throws Exception {
		this.service.remove(id);
		return ResponseEntity.ok("");
	}
}
