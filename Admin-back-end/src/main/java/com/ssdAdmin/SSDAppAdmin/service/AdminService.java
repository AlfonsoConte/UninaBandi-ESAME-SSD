package com.ssdAdmin.SSDAppAdmin.service;


import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.mail.MessagingException;
import javax.ws.rs.core.Response;

import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import com.ssdAdmin.SSDAppAdmin.security.SecurityConfig;
import com.ssdAdmin.SSDAppAdmin.util.Credentials;
import com.ssdAdmin.SSDAppAdmin.util.EmailSender;
import com.ssdAdmin.SSDAppAdmin.util.UserDTO;


@Service
public class AdminService {
	
	@Autowired
	JavaMailSenderImpl mailSender;


    public String addUser(UserDTO userDTO,String userRole){
    	   	
    	
        CredentialRepresentation credential = Credentials
                .createPasswordCredentials(userDTO.getPassword());
        UserRepresentation user = new UserRepresentation();
        user.setUsername(userDTO.getUserName());
        user.setFirstName(userDTO.getFirstname());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmailId());
        user.setCredentials(Collections.singletonList(credential));
        user.setEnabled(false);
        UsersResource instance = getInstance();
        Response response=instance.create(user);
        
        
        
             
       if(response.getStatus()>=200 || response.getStatus()<=204) {
    
        List<UserRepresentation> user_keycloak= getUser(userDTO.getUserName());
        String UserId="";
        try {
        UserId= user_keycloak.get(0).getId();
        }
        catch (Exception e){
        	System.err.println("Error: the array is empty!");
        	return "-1";
        }
        UserResource userResource = getInstance().get(UserId);
        List<RoleRepresentation> roleRepresentationList = userResource.roles().realmLevel().listAvailable();
        for (RoleRepresentation roleRepresentation : roleRepresentationList) {
            if (roleRepresentation.getName().equals(userRole)) {
                userResource.roles().realmLevel().add(Arrays.asList(roleRepresentation));
                break;
            }
        }
        
        RealmResource realmResource = SecurityConfig.getInstance().realm("SSD_REALM");
        ClientRepresentation appClient = realmResource.clients().findByClientId("application-rest-api").get(0);
        RoleRepresentation userClientRole = realmResource.clients().get(appClient.getId()) //
                .roles().get(userRole).toRepresentation();
        userResource.roles() //
                .clientLevel(appClient.getId()).add(Arrays.asList(userClientRole));
        return UserId;
        }
       
       else{
    	   return "-1";
       }
      
        
        
    }

    public List<UserRepresentation> getUser(String userName){
        UsersResource usersResource = getInstance();
        List<UserRepresentation> user = usersResource.search(userName, true);
        return user;

    }

    public void updateUser(String userId, UserDTO userDTO){
        CredentialRepresentation credential = Credentials
                .createPasswordCredentials(userDTO.getPassword());
        UserRepresentation user = new UserRepresentation();
        user.setUsername(userDTO.getUserName());
        user.setFirstName(userDTO.getFirstname());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmailId());
        user.setCredentials(Collections.singletonList(credential));

        UsersResource usersResource = getInstance();
        usersResource.get(userId).update(user);
    }
    public void deleteUser(String userId){
        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .remove();
    }


    public void sendVerificationLink(String userId){
        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .sendVerifyEmail();
    }

    public void sendResetPassword(String userId){
        UsersResource usersResource = getInstance();

        usersResource.get(userId)
                .executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
    }

    public UsersResource getInstance(){
        return SecurityConfig.getInstance().realm(SecurityConfig.realm).users();
    }

	public List<UserRepresentation> getAllUsers() {
		List<UserRepresentation> list = getInstance().list();
		int index=0;
		
		for(int i=0;i<list.size();i++){
		    if(list.get(i).getUsername().equals("admin")) {
		    	index=i;
		    	
		    }
		} 
		list.remove(index);		
		return list;
	}
	
	public boolean EnableDisable(String username,boolean enable) {
		
		
		EmailSender emailSender = new EmailSender(mailSender);
	    String subject = "Hello from Bandi Unina";
		
        try {
        List<UserRepresentation> user_keycloak= getUser(username);
        UsersResource instance = getInstance();
        UserResource userResource=instance.get(user_keycloak.get(0).getId());
        
        
        UserRepresentation userUpdate =userResource.toRepresentation();
        userUpdate.setEnabled(enable);
        String recipientEmail=userUpdate.getEmail();
        
        userResource.update(userUpdate);
        
        
        if(enable==true) {
        	String content = "<p>Ciao "+username+",</p><p>Siamo felici di informarti che il tuo account BandiUnina è stato attivato!</p> <p> Saluti, Il team di BandiUnina :) </p>";
        	
        	 try {
        	     emailSender.sendEmail(recipientEmail, subject, content);
        	     System.out.println("Email sent successfully.");
        	     } catch (Exception e) {
        	     System.out.println("Failed to send email. Error: " + e.getMessage());
        	     }
        	
        }
        else{
        	String content = "<p>Ciao "+username+",</p><p>Siamo spiacenti di informarti che il tuo account è stato temporaneamente disabilitato, ti invitiamo a contattare il servizio clienti.</p> <p> Saluti, Il team di BandiUnina :( </p>";
        	
        	 try {
        	     emailSender.sendEmail(recipientEmail, subject, content);
        	     System.out.println("Email sent successfully.");
        	     } catch (MessagingException | UnsupportedEncodingException e) {
        	     System.out.println("Failed to send email. Error: " + e.getMessage());
        	     }
        	
        }
  
        return true;
        }
        catch (Exception e){
        	System.err.println("Error: the array is empty!");
        	return false;
        }
	}


}