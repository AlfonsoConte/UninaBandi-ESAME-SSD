package com.ssdexam.SSDApp.util;

import org.keycloak.admin.client.resource.UserResource;

public class NewUserDTO {
	
	UserResource userResource;
	String id;
	public UserResource getUserResource() {
		return userResource;
	}
	public void setUserResource(UserResource userResource) {
		this.userResource = userResource;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public NewUserDTO() {
		
	}
	public NewUserDTO(UserResource userResource, String id) {
		super();
		this.userResource = userResource;
		this.id = id;
	}
 
	
}
