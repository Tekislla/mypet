package com.main.mypet.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.main.mypet.entities.Person;

public interface PersonRepository extends CrudRepository<Person, Long> {
	
	@Query(value = "SELECT new com.main.mypet.entities.Person(p.id, p.login, p.name, p.email, p.password, p.score, p.canAdopt) FROM Person p WHERE p.login = ?1")
	public Person findByLogin(String login);

}
