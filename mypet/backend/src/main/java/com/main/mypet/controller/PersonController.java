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

import com.main.mypet.dto.PersonDto;
import com.main.mypet.entities.Person;
import com.main.mypet.service.PersonService;



@RestController
@CrossOrigin
@RequestMapping(value = "/person")
public class PersonController {
	@Autowired
	private PersonService personService;
	
	@PostMapping(value = "/create-person")
	public String createPerson(@RequestBody PersonDto person) {
		return personService.createPerson(person);
	}
	
	@GetMapping(value = "/find-all")
	public List<Person> findAll() {
		return personService.findAll();
	}

	@GetMapping(value = "/find-by-id/{id}")
	public Person findById(@PathVariable Long id) {
		return personService.findById(id);
	}
	
	@PostMapping(value = "/update-person/{id}")
	public String updatePerson(@PathVariable Long id, @RequestBody PersonDto person) {
		return personService.updatePerson(id, person);
	}
	
	@PostMapping(value = "/delete-person/{id}")
	public String deletePerson(@PathVariable Long id) {
		return personService.deletePerson(id);
	}
	
}