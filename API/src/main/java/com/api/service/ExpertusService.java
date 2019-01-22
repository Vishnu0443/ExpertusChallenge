package com.api.service;

import org.jvnet.hk2.annotations.Service;
import org.springframework.stereotype.Component;

import com.api.model.ExpertusClient;
import com.api.model.SystemRepository;

@Service
@Component
public class ExpertusService {

	SystemRepository systemRepository;

	public void saveClientInfo(String model) {

		systemRepository.save(model);

	}

	public String getClientInfo() {

		return "Hello Expertus! This is Vishu";

	}

	public void saveMessage(String firstName, String lastName, String phoneNumber, String email, String message) {

		ExpertusClient clientMsg =   new ExpertusClient();
		clientMsg.setFirstName(firstName);
		clientMsg.setLastName(lastName);
		clientMsg.setPhoneNumber(phoneNumber);
		clientMsg.setEmail(email);
		clientMsg.setMessage(message);
				
		systemRepository.save(clientMsg);
	}

}
