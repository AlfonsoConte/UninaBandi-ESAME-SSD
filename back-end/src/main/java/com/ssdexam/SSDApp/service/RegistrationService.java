package com.ssdexam.SSDApp.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.core.Response;

import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import com.ssdexam.SSDApp.security.SecurityConfig;
import com.ssdexam.SSDApp.util.Credentials;
import com.ssdexam.SSDApp.util.NewUserDTO;
import com.ssdexam.SSDApp.util.UserDTO;

@Service
public class RegistrationService {


    public NewUserDTO addUser(UserDTO userDTO,String userRole){
    	   	
    	
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

        System.out.println("CODICE CHE RICEVO DOPO LA CREATE SU KEYCLOAK");
        System.out.println(response.getStatus());
             
       if(response.getStatus()>=200 && response.getStatus()<=204) {
    
        List<UserRepresentation> user_keycloak= getUser(userDTO.getUserName());
        String UserId="";
        try {
        UserId= user_keycloak.get(0).getId();
        
        }
        catch (Exception e){
        	System.err.println("Error: the array is empty!");
        	return null;
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
        NewUserDTO utente= new NewUserDTO(userResource,UserId);
        return utente;
        }
       
       else{
    	   
    	   return null;
       }
      
        
        
    }

    public List<UserRepresentation> getUser(String userName){
        UsersResource usersResource = getInstance();
        List<UserRepresentation> user = usersResource.search(userName, true);
        return user;

    }
    
    public void deleteUser(String userId){
        UsersResource usersResource = getInstance();
        usersResource.get(userId)
                .remove();
    }


    public UsersResource getInstance(){
        return SecurityConfig.getInstance().realm(SecurityConfig.realm).users();
    }


}