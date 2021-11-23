package com.main.mypet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.mypet.dto.PetDto;
import com.main.mypet.entities.Pet;
import com.main.mypet.service.PetService;

@RestController
@CrossOrigin
@RequestMapping(value = "/pet")
public class PetController {
	@Autowired
	private PetService petService;
	
	@PostMapping(value = "/create-pet")
	public String createpet(@RequestBody PetDto pet) {
		return petService.createPet(pet);
	}
	
	@GetMapping(value = "/find-all")
	public List<Pet> findAll() {
		return petService.findAll();
	}

	@GetMapping(value = "/find-by-id/{id}")
	public Pet findById(@PathVariable Long id) {
		return petService.findById(id);
	}
	
	@PostMapping(value = "/update-pet/{id}")
	public String updatepet(@PathVariable Long id, @RequestBody PetDto pet) {
		return petService.updatePet(id, pet);
	}
	
	@PostMapping(value = "/delete-pet/{id}")
	public String deletepet(@PathVariable Long id) {
		return petService.deletePet(id);
	}
}
