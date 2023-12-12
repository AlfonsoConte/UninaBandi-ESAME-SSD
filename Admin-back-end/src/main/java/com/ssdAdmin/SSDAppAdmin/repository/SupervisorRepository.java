package com.ssdAdmin.SSDAppAdmin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssdAdmin.SSDAppAdmin.domain.Supervisor;



public interface SupervisorRepository  extends JpaRepository<Supervisor, String> {
	
	
	public Optional<Supervisor> findById(String Id);

}
