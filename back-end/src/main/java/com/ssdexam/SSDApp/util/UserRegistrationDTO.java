package com.ssdexam.SSDApp.util;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserRegistrationDTO {
	
	@NotNull
	@NotEmpty
	@Size(max = 64)
    private String userName;
	@Pattern(regexp="^[A-Z][0-9]{8}|^$")
	@Size(max = 9)
    private String matricola;
	@NotNull
	@NotEmpty
	@Size(max = 64)
    private String name;
	@NotNull
	@NotEmpty
	@Size(max = 64)
    private String surname;
	@NotNull
	@NotEmpty
	@Email
	@Pattern(regexp=".+@.+\\..+")
	@Size(max = 64)
    private String email;
	@NotNull
	@NotEmpty
	@Size(max = 10)
	@Pattern(regexp="^[0-9]{10}$")
    private String tel;
	@NotNull
	@NotEmpty
    private String birthDay;
    @NotNull
    @NotEmpty
    @Size(min = 8, max = 64)
    private String password;
	@Size(max = 10)
	@Pattern(regexp="^[0-9]{10}|^$")
    private String badgeNumber;
	@NotNull
	@NotEmpty
	@Pattern(regexp="^(Studente|Supervisor)$")
    private String role;
    
    
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getMatricola() {
		return matricola;
	}
	public void setMatricola(String matricola) {
		this.matricola = matricola;
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
	public String getBirthDay() {
		return birthDay;
	}
	public void setBirthDay(String birthDay) {
		this.birthDay = birthDay;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBadgeNumber() {
		return badgeNumber;
	}
	public void setBadgeNumber(String badgeNumber) {
		this.badgeNumber = badgeNumber;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
    
    
    

}
