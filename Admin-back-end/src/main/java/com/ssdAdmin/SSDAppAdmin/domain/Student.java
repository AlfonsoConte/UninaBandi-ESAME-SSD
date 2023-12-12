package com.ssdAdmin.SSDAppAdmin.domain;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="student")
public class Student{
	
	@Id
	private String id;
	@Column(unique=true)
	private String userName;
	@Column(unique=true)
	private String matricola;
	private String name;
	private String surname;
	@Column(unique=true)
	private String email;
	@Column(unique=true)
	private String tel;
	private LocalDate birthDay;
	@OneToMany(cascade = CascadeType.ALL,mappedBy="student")
	@JsonIgnore
	private List<Participation> participations;
	
	
	
	public Student(String id, String userName, String matricola, String name, String surname, String email, String tel,
			LocalDate birthDay, List<Participation> participations) {
		super();
		this.id = id;
		this.userName = userName;
		this.matricola = matricola;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.tel = tel;
		this.birthDay = birthDay;
		this.participations = participations;
	}
	
	public Student() {
		super();
	}



	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public List<Participation> getParticipations() {
		return participations;
	}
	public void setParticipations(List<Participation> participations) {
		this.participations = participations;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public LocalDate getBirthDay() {
		return birthDay;
	}
	public void setBirthDay(LocalDate birthDay) {
		this.birthDay = birthDay;
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMatricola() {
		return matricola;
	}

	public void setMatricola(String matricola) {
		this.matricola = matricola;
	}

	
	
}
