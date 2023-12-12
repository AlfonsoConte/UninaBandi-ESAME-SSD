package com.ssdexam.SSDApp.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssdexam.SSDApp.domain.CallForApplication;
import com.ssdexam.SSDApp.domain.Supervisor;
import com.ssdexam.SSDApp.service.CallForApplicationService;
import com.ssdexam.SSDApp.service.SupervisorService;
import com.ssdexam.SSDApp.util.TokenUtil;

@RestController
@CrossOrigin(origins ="http://127.0.0.1:80", allowCredentials="true")
@RequestMapping("/api/callForApplications")
public class CallForApplicationController{
	
	@Autowired
	private CallForApplicationService callService;

	@Autowired
	private TokenUtil tokenUtil;
	@Autowired
	private SupervisorService supervisorService;
	
	
	@PostMapping("/supervisor/create")
	public ResponseEntity<?> createCallForApplication( @RequestHeader(name = "Authorization") String token) {
		String supervisorId=tokenUtil.getIdFromToken(token);
		if(supervisorId=="-1") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non è stato possibile parsare il token");
		}
		Optional<Supervisor> supervisor=supervisorService.findById(supervisorId);
		CallForApplication newCall=callService.save(supervisor.get());
		supervisor.get().getCalls().add(newCall);
		supervisorService.save(supervisor.get());
		return ResponseEntity.ok(newCall);		
	}
	
	@GetMapping("/supervisor/calls")
	public ResponseEntity<?> getCallForApplications( @RequestHeader(name = "Authorization") String token){
		String supervisorId=tokenUtil.getIdFromToken(token);
		if(supervisorId=="-1") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non è stato possibile parsare il token");
		}	
		Optional<Supervisor> supervisor=supervisorService.findById(supervisorId);
		return ResponseEntity.ok(supervisor.get().getCalls());
	}
	@GetMapping("/student/getAll")
	public ResponseEntity<?> getAllCallForApplication(){
		List<CallForApplication> Allcalls =callService.findAll();
		return ResponseEntity.ok(Allcalls);
	}
	
	@GetMapping("/student/{callId}")
	public ResponseEntity<?> getCallForApplicationByIdStudent(@PathVariable Long callId){
		Optional<CallForApplication> callOpt= callService.findById(callId);
		return ResponseEntity.ok(callOpt.orElse(new CallForApplication()));
	}
	
	@GetMapping("/supervisor/{callId}")
	public ResponseEntity<?> getCallForApplicationByIdSupervisor(@PathVariable Long callId){
		Optional<CallForApplication> callOpt= callService.findById(callId);
		return ResponseEntity.ok(callOpt.orElse(new CallForApplication()));
	}
	@PostMapping("/supervisor/editcall/{callId}")
	public ResponseEntity<?> updateCallForApplication(@PathVariable Long callId, @RequestBody CallForApplication call){
		
		CallForApplication updateCall = callService.save(call);
		return ResponseEntity.ok(updateCall);		
	}
	
	@DeleteMapping("/supervisor")
	public ResponseEntity<?> deleteCallForApplication(@RequestBody Long callId){
		callService.deleteById(callId);
		return ResponseEntity.ok("Deleted");	
	}
	@GetMapping("/supervisor/{callId}/participations")
	public ResponseEntity<?> getParticipations(@PathVariable Long callId){		
		Optional<CallForApplication> call= callService.findById(callId);		
		return ResponseEntity.ok(call.get().getParticipations());
	}
	
	
	@GetMapping("/guest/getLast")
	public ResponseEntity<?> getLastParticipations(){		
		List<CallForApplication> call= callService.findAll();	
		List<CallForApplication> lastTwo= new ArrayList<CallForApplication>();
		if(call.size()>=2) {
		lastTwo.add(call.get(call.size()-1));
		lastTwo.add(call.get(call.size()-2));
		
		
		}
		else if(call.size()==1) {
			lastTwo.add(call.get(call.size()-1));
			
		}
		return ResponseEntity.ok(lastTwo);
		
		
	}

	
}