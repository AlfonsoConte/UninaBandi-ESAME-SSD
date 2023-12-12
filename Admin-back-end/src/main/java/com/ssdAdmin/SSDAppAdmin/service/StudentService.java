package com.ssdAdmin.SSDAppAdmin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssdAdmin.SSDAppAdmin.domain.Participation;
import com.ssdAdmin.SSDAppAdmin.domain.Student;
import com.ssdAdmin.SSDAppAdmin.repository.StudentRepository;

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
	
	public void deleteById(String studentId) {
		Optional<Student> s=this.findById(studentId);
		studentRepo.delete(s.get());
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