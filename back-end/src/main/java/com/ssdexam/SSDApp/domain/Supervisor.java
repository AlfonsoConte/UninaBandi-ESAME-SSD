package com.ssdexam.SSDApp.domain;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="supervisor")
public class Supervisor {
	@Id
	@Column(nullable=false)
	private String id;
	@Column(unique=true)
	private String userName;
	@Column(unique=true)
	private String badgeNumber;
	private String name;
	private String surname;
	@Column(unique=true)
	private String email;
	@Column(unique=true)
	private String tel;
	private LocalDate birthDay;
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy="supervisor")
	@JsonIgnore
	private List<CallForApplication> calls;

    
	public List<CallForApplication> getCalls() {
		return calls;
	}
	public void setCalls(List<CallForApplication> calls) {
		this.calls = calls;
	}
	public Supervisor() {
		super();
	}
	public Supervisor(String id, String userName, String badgeNumber, String name, String surname, String email,
			String tel, LocalDate birthDay) {
		super();
		this.id = id;
		this.userName = userName;
		this.badgeNumber = badgeNumber;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.tel = tel;
		this.birthDay = birthDay;
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

	public String getBadgeNumber() {
		return badgeNumber;
	}

	public void setBadgeNumber(String badgeNumber) {
		this.badgeNumber = badgeNumber;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
