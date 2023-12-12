package com.ssdAdmin.SSDAppAdmin.domain;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Participation {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String status; // Declined , Accepted , InReview
	private LocalDate issuedDate;
	private String Review;  // InReview , Reviewed , To Be Reviewed
	@ManyToOne
	private Student student;
	@ManyToOne	
	private CallForApplication Call;

	public Participation() {
		super();
	}

	
	public Student getStudent() {
		return student;
	}


	public Participation(Long id, String status, LocalDate issuedDate, String review, Student student,
			CallForApplication call) {
		super();
		this.id = id;
		this.status = status;
		this.issuedDate = issuedDate;
		Review = review;
		this.student = student;
		Call = call;
	}


	public void setStudent(Student student) {
		this.student = student;
	}


	public CallForApplication getCall() {
		return Call;
	}
	public void setCall(CallForApplication call) {
		Call = call;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public String getReview() {
		return Review;
	}
	public void setReview(String review) {
		Review = review;
	}
	public LocalDate getIssuedDate() {
		return issuedDate;
	}
	public void setIssuedDate(LocalDate issuedDate) {
		this.issuedDate = issuedDate;
	}

	
	
}
