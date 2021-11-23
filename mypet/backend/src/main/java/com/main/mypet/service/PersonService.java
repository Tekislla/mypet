package com.main.mypet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.mypet.dto.PersonDto;
import com.main.mypet.entities.Person;
import com.main.mypet.repository.PersonRepository;

@Service
public class PersonService {
	@Autowired
	PersonRepository personRepository;
	
	public String createPerson(PersonDto personDto) {
		Person person = new Person();
		person.setLogin(personDto.getLogin());
		person.setName(personDto.getName());
		person.setEmail(personDto.getEmail());
		person.setPassword(personDto.getPassword());
		
		personRepository.save(person);
		return "Person " + person.getName() + " added!";
	}
	
	public List<Person> findAll() {
		List<Person> persons = (List<Person>) personRepository.findAll();
		return persons;
	}
	
	public Person findById(Long id) {
		Person person = personRepository.findById(id).get();
		return person;
	}
	
	public String updatePerson(Long id, PersonDto personDto) {
		Person person = personRepository.findById(id).get();
		person.setLogin(personDto.getLogin());
		person.setName(personDto.getName());
		person.setEmail(personDto.getEmail());
		person.setPassword(personDto.getPassword());
		
		personRepository.save(person);
		
		return "Person " + person.getName() + " updated!";
	}
	
	public String deletePerson(Long id) {
		String personName = personRepository.findById(id).get().getName();
		personRepository.deleteById(id);
		return "Person " + personName + " deleted!";
	}

}
