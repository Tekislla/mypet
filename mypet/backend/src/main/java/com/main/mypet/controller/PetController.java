package com.main.mypet.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.main.mypet.dto.PetDto;
import com.main.mypet.entities.Pet;
import com.main.mypet.repository.PetRepository;
import com.main.mypet.service.PetService;

@RestController
@CrossOrigin
@RequestMapping(value = "/pet")
public class PetController {
	@Autowired
	private PetService petService;
	@Autowired
	private PetRepository petRepository;
	
	@PostMapping(value = "/create-pet")
	public Long createpet(@RequestBody PetDto pet) {
		return petService.createPet(pet);
	}
	
	@PostMapping("/upload/{id}") 
	  public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Long id) throws IOException {
		Pet pet = findById(id);
		pet.setPhoto(file.getBytes());
		petRepository.save(pet);
		return ResponseEntity.ok("File uploaded");
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
