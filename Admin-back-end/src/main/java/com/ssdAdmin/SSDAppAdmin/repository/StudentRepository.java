package com.ssdAdmin.SSDAppAdmin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssdAdmin.SSDAppAdmin.domain.Student;




public interface StudentRepository extends JpaRepository<Student, Long>{
	
	public Optional<Student> findById(String Id);


}
