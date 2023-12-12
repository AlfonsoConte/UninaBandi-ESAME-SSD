package com.ssdAdmin.SSDAppAdmin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssdAdmin.SSDAppAdmin.domain.Participation;



public interface ParticipationRepository extends JpaRepository<Participation, Long>{


	public Optional<Participation> findById(Long partId);

	public List<Participation> findByStudentId(String studentId);

}
