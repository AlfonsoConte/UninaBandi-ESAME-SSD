package com.ssdAdmin.SSDAppAdmin.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssdAdmin.SSDAppAdmin.domain.Supervisor;
import com.ssdAdmin.SSDAppAdmin.repository.SupervisorRepository;

@Service
public class SupervisorService {
	
	@Autowired SupervisorRepository supervisorRepo;
	
	public Optional<Supervisor> findById(String Id) {
		return supervisorRepo.findById(Id);
	}
	
	public Supervisor save(Supervisor supervisor) {
		return supervisorRepo.save(supervisor);
	}
	
	public void deleteById(String supervisorId) {
		supervisorRepo.deleteById(supervisorId);
		
	}
	
	
}
