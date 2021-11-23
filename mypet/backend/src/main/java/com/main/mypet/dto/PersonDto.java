package com.main.mypet.dto;

import lombok.Data;

@Data
public class PersonDto {
	private String login;
	private String name;
	private String email;
	private String password;
	
	public PersonDto() {
		
	}
}
