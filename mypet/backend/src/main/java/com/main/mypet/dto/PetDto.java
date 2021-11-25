package com.main.mypet.dto;

import lombok.Data;

@Data
public class PetDto {
	private String name;
	private String type;
	private String race;
	private String city;
	private String state;
	private String contactEmail;
	private int age;
	private byte[] photo;
	
	public PetDto() {
		
	}

}
