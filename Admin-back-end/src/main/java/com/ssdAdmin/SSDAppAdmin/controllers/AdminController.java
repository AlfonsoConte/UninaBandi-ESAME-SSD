package com.ssdAdmin.SSDAppAdmin.controllers;

import java.util.List;
import java.util.Optional;

import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssdAdmin.SSDAppAdmin.domain.Student;
import com.ssdAdmin.SSDAppAdmin.domain.StudentSupervisorDTO;
import com.ssdAdmin.SSDAppAdmin.domain.Supervisor;
import com.ssdAdmin.SSDAppAdmin.service.AdminService;
import com.ssdAdmin.SSDAppAdmin.service.StudentService;
import com.ssdAdmin.SSDAppAdmin.service.SupervisorService;
import com.ssdAdmin.SSDAppAdmin.util.UserDTO;


@RestController

@RequestMapping(path = "/admin/user")
public class AdminController {


	@Autowired
	StudentService studentService;
	@Autowired 
	SupervisorService supervisorService;
	@Autowired
	AdminService adminService;
    
   
    @GetMapping(path = "/{userName}")
    public List<UserRepresentation> getUser(@PathVariable("userName") String userName){
        List<UserRepresentation> user = adminService.getUser(userName);
        return user;
    }

    @PutMapping(path = "/update/{userId}")
    public String updateUser(@PathVariable("userId") String userId, @RequestBody UserDTO userDTO){
    	adminService.updateUser(userId, userDTO);
        return "User Details Updated Successfully.";
    }

    @DeleteMapping(path = "/keycloak/delete/{userId}")
    public String deleteUser(@PathVariable("userId") String userId){
    	adminService.deleteUser(userId);
        return "User Deleted Successfully.";
    }

    @GetMapping(path = "/verification-link/{userId}")
    public String sendVerificationLink(@PathVariable("userId") String userId){
    	adminService.sendVerificationLink(userId);
        return "Verification Link Send to Registered E-mail Id.";
    }

    @GetMapping(path = "/reset-password/{userId}")
    public String sendResetPassword(@PathVariable("userId") String userId){
    	adminService.sendResetPassword(userId);
        return "Reset Password Link Send Successfully to Registered E-mail Id.";
    }
    
    @GetMapping(path = "/users")
    public List<UserRepresentation> getAllUsers(){
    	return adminService.getAllUsers();
    	
    }
    @GetMapping(path = "/details/{id}")
    public StudentSupervisorDTO getUserFromId(@PathVariable String id){
    	Optional<Student> student=studentService.findById(id);
    	
    	Optional<Supervisor> supervisor=supervisorService.findById(id);
    	StudentSupervisorDTO user=new StudentSupervisorDTO();
    	if(!student.isEmpty()) {
    	user.setStudent(student.get());
    	}
    	if(!supervisor.isEmpty()) {
    	user.setSupervisor(supervisor.get());
    	}

    	return user;	
    }
    
    @PostMapping(path = "/EnableDisable")
    public boolean enableDisableUser(@RequestBody ObjectNode obj){
    	boolean enable=obj.get("enable").asBoolean();
    	String username=obj.get("user").asText();   	
    	return adminService.EnableDisable(username,enable);        
    }
    
    @DeleteMapping("/student/delete/{studentId}")
	public ResponseEntity<?> deleteStudent(@PathVariable String studentId){
		studentService.deleteById(studentId);
		return ResponseEntity.ok("Deleted");	
	}
    
    @DeleteMapping("/supervisor/delete/{supervisorId}")
	public ResponseEntity<?> deleteSupervisor(@PathVariable String supervisorId){
		supervisorService.deleteById(supervisorId);
		return ResponseEntity.ok("Deleted");	
	}
    
}