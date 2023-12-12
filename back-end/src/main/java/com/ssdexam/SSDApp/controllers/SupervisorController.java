package com.ssdexam.SSDApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssdexam.SSDApp.service.SupervisorService;

@RestController
@CrossOrigin(origins ="http://127.0.0.1:80", allowCredentials="true")
@RequestMapping("/api/supervisor")
public class SupervisorController {
	
	@Autowired SupervisorService supervisorService;
	


}
