package com.ssdAdmin.SSDAppAdmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssdAdmin.SSDAppAdmin.domain.CallForApplication;

public interface CallForApplicationRepository extends JpaRepository<CallForApplication, Long> {
	
	public void deleteById(Long callid);

	//public List<CallForApplication> findBySupervisorId(String supervisorId);

}
