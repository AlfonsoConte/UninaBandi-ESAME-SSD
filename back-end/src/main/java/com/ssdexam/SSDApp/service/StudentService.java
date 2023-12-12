package com.ssdexam.SSDApp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssdexam.SSDApp.domain.Participation;
import com.ssdexam.SSDApp.domain.Student;
import com.ssdexam.SSDApp.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepo;
	
	public Student save(Student student) {
		return studentRepo.save(student);
	}
	
	public Optional<Student> findById(String Id) {
		return studentRepo.findById(Id);
	}
	



	public boolean checkCall(String studentId, Long callId) {
		Optional<Student> s= studentRepo.findById(studentId);
		List<Participation> participations=s.get().getParticipations();
		

		for (Participation p : participations) {
		    if(p.getCall().getId()==callId) {
		    	return true;
		    }
		}
		return false;
	}


}