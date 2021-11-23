package com.main.mypet.repository;

import org.springframework.data.repository.CrudRepository;

import com.main.mypet.entities.Pet;

public interface PetRepository extends CrudRepository<Pet, Long> {
	
	
}
