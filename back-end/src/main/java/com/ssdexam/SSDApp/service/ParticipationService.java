package com.ssdexam.SSDApp.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssdexam.SSDApp.domain.CallForApplication;
import com.ssdexam.SSDApp.domain.Participation;
import com.ssdexam.SSDApp.domain.Student;
import com.ssdexam.SSDApp.repository.ParticipationRepository;

@Service
public class ParticipationService {

	@Autowired
	private ParticipationRepository participationRepo;
	@Autowired
	private StudentService studentService;
	@Autowired 
	private CallForApplicationService callService;

	public Participation save(Participation part) {
		return participationRepo.save(part);
	}
	public Optional<Participation> findById(Long Id) {
		return participationRepo.findById(Id);
	}
	public List<Participation> findByStudentId(String studentId) {
		
		return participationRepo.findByStudentId(studentId);
	}
	public Participation apply(Long callId, String studentId) {
		Optional<CallForApplication> call= callService.findById(callId);
		Participation p=new Participation();
		p.setReview("To Be Reviewed");
		p.setStatus("Applied");
		Optional<Student> student= studentService.findById(studentId);
		p.setStudent(student.get());
		student.get().getParticipations().add(p);
		p.setIssuedDate(LocalDate.now());
		p.setCall(call.get());
		call.get().getParticipations().add(p);
		return participationRepo.save(p);
	}


}
