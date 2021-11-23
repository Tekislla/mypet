package com.main.mypet.repository;

import org.springframework.data.repository.CrudRepository;

import com.main.mypet.entities.Person;

public interface PersonRepository extends CrudRepository<Person, Long> {
	

}
