package com.ssdexam.SSDApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssdexam.SSDApp.domain.Student;


public interface StudentRepository extends JpaRepository<Student, Long>{
	
	public Optional<Student> findById(String Id);


}
