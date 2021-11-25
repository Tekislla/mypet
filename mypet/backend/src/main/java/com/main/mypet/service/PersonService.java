package com.main.mypet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.mypet.dto.PersonDto;
import com.main.mypet.entities.Person;
import com.main.mypet.entities.Pet;
import com.main.mypet.entities.Questions;
import com.main.mypet.repository.PersonRepository;
import com.main.mypet.repository.PetRepository;

@Service
public class PersonService {
	@Autowired
	PersonRepository personRepository;
	@Autowired
	EmailServiceImpl emailService;
	@Autowired
	PetRepository petRepository;
	
	public Long createPerson(PersonDto personDto) {
		Person person = new Person();
		person.setLogin(personDto.getLogin());
		person.setName(personDto.getName());
		person.setEmail(personDto.getEmail());
		person.setPassword(personDto.getPassword());
		
		personRepository.save(person);
		return person.getId();
	}
	
	public List<Person> findAll() {
		List<Person> persons = (List<Person>) personRepository.findAll();
		return persons;
	}
	
	public Person findById(Long id) {
		Person person = personRepository.findById(id).get();
		return person;
	}
	
	
	public void deleteAll() {
		personRepository.deleteAll();
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
	
	public void addScore(Long id, Questions questions) {
		Person person = personRepository.findById(id).get();
		person.setScore(0);
		switch (questions.getQuestion1()) {
			case "Apartamento":
				person.setScore(person.getScore()+1);
				break;
			case "Casa":
				person.setScore(person.getScore()+2);
				break;
			default:
				break;
		}
		switch (questions.getQuestion2()) {
			case "Sim":
				person.setScore(person.getScore()+1);
				break;
			case "Não":
				person.setScore(person.getScore()+2);
				break;
			default:
				break;
		}
		switch (questions.getQuestion3()) {
			case "Mais que 8 horas":
				person.setScore(person.getScore()+1);
				break;
			case "Menos que 8 horas":
				person.setScore(person.getScore()+2);
				break;
			default:
				break;
		}
		switch (questions.getQuestion4()) {
			case "Mais que 3":
				person.setScore(person.getScore()+0);
				break;
			case "2 ou 3":
				person.setScore(person.getScore()+1);
				break;
			case "0 ou 1":
				person.setScore(person.getScore()+2);
				break;
			default:
				break;
		}
		switch (questions.getQuestion5()) {
			case "Não":
				person.setScore(person.getScore()-2);
				break;
			case "Sim":
				person.setScore(person.getScore()+2);
				break;
			default:
				break;
		}
		
		if(person.getScore() > 5) {
			person.setCanAdopt(true);
		}
		
		personRepository.save(person);
		
	}
	
	public Long userLogin(String login, String password) {
		Person person = personRepository.findByLogin(login);
		if (person == null) {
			return 0L;
		} else {
			if (person.getPassword().equals(password)) {
				return person.getId();
			} else {
				return 400L;
			}
		}
	}
	
	public void adoptPet(Long personId, Long petId) {
		Person person = personRepository.findById(personId).get();
		Pet pet = petRepository.findById(petId).get();
		String subject = "Requisição de adoção";
		String message = "Olá, há uma nova requisição para adoção do pet " + pet.getName() + "! Entre em contato com o seguinte email para conversar com o solicitante: " + person.getEmail();
		
		emailService.sendDefaultMessage(pet.getContactEmail(), subject, message);
	}

}
