package com.ssdexam.SSDApp.controllers;

import java.time.LocalDate;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.ssdexam.SSDApp.domain.Student;
import com.ssdexam.SSDApp.domain.Supervisor;
import com.ssdexam.SSDApp.service.RegistrationService;
import com.ssdexam.SSDApp.service.StudentService;
import com.ssdexam.SSDApp.service.SupervisorService;
import com.ssdexam.SSDApp.util.NewUserDTO;
import com.ssdexam.SSDApp.util.RecaptchaResponse;
import com.ssdexam.SSDApp.util.UserDTO;
import com.ssdexam.SSDApp.util.UserRegistrationDTO;

@RestController
@RequestMapping(path = "api/guest/register")
@Validated
public class RegistrationController {
	

	@Autowired
	StudentService studentService;
	@Autowired 
	SupervisorService supervisorService;
	@Autowired
	RegistrationService adminService;
	
	@Autowired
	private Environment env;
	
	 @PostMapping("/{captchaToken}")
	    public ResponseEntity<String> addUser(@Valid @RequestBody UserRegistrationDTO user,@PathVariable String captchaToken ){

		 String url = "https://www.google.com/recaptcha/api/siteverify";
		 
		 String secretCaptcha=env.getProperty("secretCaptcha");
		 

		 boolean validCaptcha=false;
		 
			  
			 RestTemplate restTemplate = new RestTemplate();
			 HttpHeaders headers = new HttpHeaders();
			 headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
			  
			 UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("secret", secretCaptcha).queryParam("response", captchaToken);
			 HttpEntity<String> entity = new HttpEntity<>(headers);
			  
			 ResponseEntity<RecaptchaResponse>response = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity,RecaptchaResponse.class);

			 RecaptchaResponse rs = response.getBody();
			 if (response.getStatusCode().value() == 200  && rs.isSuccess()) {
				 System.out.println("validazione successo captcha");
			 validCaptcha=true;
			 }
			 else
			 {
				System.out.println("validazione fallita captcha");
				validCaptcha=false;
			 }
			 		
			  
	    	UserDTO userDTO = new UserDTO(user.getUserName(),user.getEmail(),user.getPassword(),user.getName(),user.getSurname());

	        //Valida la password, username, email !
	    	
	    	if(validCaptcha==false) {
	    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CAPTCHA SCADUTO");
	    	}
	        
	    	NewUserDTO utente =adminService.addUser(userDTO,"ROLE_"+user.getRole().toUpperCase());
	    	
	        if(utente==null) {      
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CONTROLLA I CAMPI DELLA REGISTRAZIONE");
	        }
	        LocalDate birthday = LocalDate.parse(user.getBirthDay());
	        String Id=utente.getId();
	        
	        //La save controlla l'unicità di tutti gli altri campi.
	        
	        
	        if(user.getRole().equals("Studente")) {
	        Student student =new Student(Id,user.getUserName(),user.getMatricola(),user.getName(),user.getSurname(),user.getEmail(),user.getTel(),birthday,null);
	        try {
	        studentService.save(student);
	        }
	        catch (Exception e) {
				System.out.println(e.getMessage());
				utente.getUserResource().remove();
				System.out.println("UTENTE ELIMINATO DA KEYCLOAK");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("DUPLICATE");
			}      
	        
	        }
	             
	        else if(user.getRole().equals("Supervisor")) {
	        	Supervisor supervisor =new Supervisor(Id,user.getUserName(),user.getBadgeNumber(),user.getName(),user.getSurname(),user.getEmail(),user.getTel(),birthday);
	
		        try {
			        supervisorService.save(supervisor);
			        }
			        catch (Exception e) {
						System.out.println(e.getMessage());
						utente.getUserResource().remove();
						System.out.println("UTENTE ELIMINATO DA KEYCLOAK");
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("DUPLICATE");
					}  
	        	
	        	
	        }
	        else {
	        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("TENTATIVO DI REGISTRAZIONE NON VALIDO");
	        }
	        return ResponseEntity.ok("User Added Successfully.");
	    }


}
