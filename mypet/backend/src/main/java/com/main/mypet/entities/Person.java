package com.main.mypet.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table
public class Person {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String login;
	private String name;
	private String email;
	private String password;
	private int score = 0;
	private Boolean canAdopt = false;
	
	public Person() {
		
	}

	public Person(Long id, String login, String name, String email, String password, int score, Boolean canAdopt) {
		this.id = id;
		this.login = login;
		this.name = name;
		this.email = email;
		this.password = password;
		this.score = score;
		this.canAdopt = canAdopt;
	}
	
	
	
}
