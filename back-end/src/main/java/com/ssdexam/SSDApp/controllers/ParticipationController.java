package com.ssdexam.SSDApp.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssdexam.SSDApp.domain.Participation;
import com.ssdexam.SSDApp.repository.ParticipationRepository;
import com.ssdexam.SSDApp.service.ParticipationService;
import com.ssdexam.SSDApp.service.StudentService;
import com.ssdexam.SSDApp.util.TokenUtil;

@RestController
@RequestMapping("/api/participations")
public class ParticipationController{
	//TODO RICAVARE DAL JWT CHE E' STATO INVIATO 'UTENTE CORRISPONDENTE ACCEDENDO AL DB E CREANDO PRATICAMENTE UN USERCONTROLLER E UN USERSERVICE!!!! 
	//L'OBIETTIVO è PASSARLO COME PARAMETRO DELLA SAVE APPLICATION!!!!
	@Autowired
	private ParticipationService participationService;
	@Autowired
	private ParticipationRepository participationRepo;
	@Autowired
	private StudentService studentService;
	@Autowired 
	private TokenUtil tokenUtil;
	

	@GetMapping("")
	public ResponseEntity<?> getParticipations(){
		List<Participation> Allparticipations = participationRepo.findAll();
		return ResponseEntity.ok(Allparticipations);
	}
	
	@GetMapping("/student/get")
	public ResponseEntity<?> getParticipationsByStudent( @RequestHeader(name = "Authorization") String token){
		String studentId=tokenUtil.getIdFromToken(token);
		if(studentId=="-1") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non è stato possibile parsare il token");
		}
		List<Participation> participations = participationService.findByStudentId(studentId);
		return ResponseEntity.ok(participations);
	}
	
	@GetMapping("{participationId}")
	public ResponseEntity<?> getParticipationById(@PathVariable Long participationId){
		Optional<Participation> participationOpt= participationService.findById(participationId);
		return ResponseEntity.ok(participationOpt.orElse(new Participation()));
	}

	
	@PostMapping("/supervisor/approve")
	public ResponseEntity<?> ApproveParticipation(@RequestBody Long partid) {
		Optional<Participation> p=participationService.findById(partid);
		p.get().setReview("Reviewed");
		p.get().setStatus("Approved");
		participationService.save(p.get());
				return ResponseEntity.ok("Approved");		
	}
	
	@PostMapping("/supervisor/decline")
	public ResponseEntity<?> DeclineParticipation(@RequestBody Long partid) {
		Optional<Participation> p=participationService.findById(partid);
		
		p.get().setReview("Reviewed");
		p.get().setStatus("Declined");
		participationService.save(p.get());
				return ResponseEntity.ok("Declined");		
	}
	
	@GetMapping("/supervisor/review/{partId}")
	public ResponseEntity<?> getStudentOfParticipation(@PathVariable Long partId){		
		Optional<Participation> part= participationService.findById(partId);
		return ResponseEntity.ok(part.get().getStudent());
	}
	
	
	@PostMapping("/student/apply/{callId}")
	public ResponseEntity<?> ApplyCallForApplication(@PathVariable Long callId, @RequestHeader(name = "Authorization") String token) {
		String studentId=tokenUtil.getIdFromToken(token);
		if(studentId=="-1") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non è stato possibile parsare il token");
		}
		boolean check=studentService.checkCall(studentId, callId); 
		if(check==false) {
		 Participation p=participationService.apply(callId,studentId);
		 return ResponseEntity.ok(p);
		 }
		else {
		 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Application già effettuata!");
		}

	}
	
	@PostMapping("/supervisor/update/{partId}")
	public ResponseEntity<?> UpdateParticipation(@PathVariable Long partId) {
		Optional<Participation> p=participationService.findById(partId);
		p.get().setReview("In Review");	
		participationService.save(p.get());
				return ResponseEntity.ok("Updated");		
	}
	
}
