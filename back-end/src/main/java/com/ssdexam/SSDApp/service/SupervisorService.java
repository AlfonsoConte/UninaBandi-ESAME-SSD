package com.ssdexam.SSDApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssdexam.SSDApp.domain.Supervisor;
import com.ssdexam.SSDApp.repository.SupervisorRepository;

@Service
public class SupervisorService {
	
	@Autowired SupervisorRepository supervisorRepo;
	
	public Optional<Supervisor> findById(String Id) {
		return supervisorRepo.findById(Id);
	}
	
	public Supervisor save(Supervisor supervisor) {
		return supervisorRepo.save(supervisor);
	}
	
	
	
}
