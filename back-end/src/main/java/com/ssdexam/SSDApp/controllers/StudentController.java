package com.ssdexam.SSDApp.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.ssdexam.SSDApp.service.StudentService;
import com.ssdexam.SSDApp.util.TokenUtil;

@RestController
@CrossOrigin(origins ="http://127.0.0.1:80", allowCredentials="true")
@RequestMapping("/api/student")
public class StudentController {

	@Autowired TokenUtil tokenUtil;
	@Autowired StudentService studentService;

	
	@GetMapping("/checkCall/{callIdString}")
	public ResponseEntity<?> getCallForApplication(@PathVariable String callIdString, @RequestHeader(name = "Authorization") String token){
		String studentId=tokenUtil.getIdFromToken(token);
		if(studentId=="-1") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non è stato possibile parsare il token");
		}
		Long callId=Long.parseLong(callIdString);
		boolean check=studentService.checkCall(studentId, callId); 
		return ResponseEntity.ok(check);
	}
	
	
	
}
