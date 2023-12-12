package com.ssdexam.SSDApp.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssdexam.SSDApp.domain.CallForApplication;
import com.ssdexam.SSDApp.domain.Supervisor;
import com.ssdexam.SSDApp.repository.CallForApplicationRepository;
import com.ssdexam.SSDApp.repository.SupervisorRepository;

@Service
public class CallForApplicationService {

	@Autowired
	private CallForApplicationRepository callRepo;

	
	public CallForApplication save(Supervisor s) {
		CallForApplication call= new CallForApplication();
		call.setSupervisor(s);
		
		call.setExpireDate(LocalDate.of(0001,01,01));
		call.setTitle("");
		call.setDescription("");
		call.setDocUrl("");
		s.getCalls().add(call);
		return callRepo.save(call);
	}

	public Optional<CallForApplication> findById(Long Id) {
		return callRepo.findById(Id);
	}
	
	public CallForApplication save(CallForApplication call) {
		return callRepo.save(call);
	}

	public void deleteById(Long callId) {
		callRepo.deleteById(callId);
		
	}


	public List<CallForApplication> findAll() {
		return callRepo.findAll();
	
	}
	
	
}


