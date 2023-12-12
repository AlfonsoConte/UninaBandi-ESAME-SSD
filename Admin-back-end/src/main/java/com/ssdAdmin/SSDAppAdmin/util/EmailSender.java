package com.ssdAdmin.SSDAppAdmin.util;
import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class EmailSender {
	
	@Autowired
	private JavaMailSender mailSender;

	public EmailSender(JavaMailSender mailSender) {	
		this.mailSender = mailSender;
	}
	
	public void sendEmail(String email, String subject, String content) throws MessagingException, UnsupportedEncodingException {
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		
		helper.setFrom("uninabandi@libero.it", "No-Reply-Unina-Bandi");
		helper.setTo(email);
		
		helper.setSubject(subject);
		helper.setText(content, true);
		
		mailSender.send(message);
	}

}
