package com.ssdexam.SSDApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssdexam.SSDApp.domain.Supervisor;

public interface SupervisorRepository  extends JpaRepository<Supervisor, String> {
	
	
	public Optional<Supervisor> findById(String Id);

}
