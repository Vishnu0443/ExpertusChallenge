package com.api;

import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.api.service.ExpertusService;

@Controller
public class ExpertusApiController {
	
	
	@Autowired ExpertusService expertusService;

	@RequestMapping("/getClientInfo")
	@Bean
	@ConditionalOnMissingBean
	public @ResponseBody String getClientInfo(){
		return expertusService.getClientInfo();
	}
	
	@RequestMapping(value="/saveClientInfo", method = RequestMethod.POST)
	public @ResponseBody String saveClientInfo(@RequestParam String model){
		try {
			expertusService.saveClientInfo(model);
				
		} catch (Exception ex) {
			return "Error Occured while saving the client info" +ex.getLocalizedMessage();
		}
		return "Save Successfullly";
	}
	
	@RequestMapping(value="/saveMessage", method = RequestMethod.POST)
	public @ResponseBody String saveMessage(@RequestParam(value = "firstName") String firstName, @RequestParam(value = "lastName")  String lastName,@RequestParam(value = "phone")   String phone, 
			@RequestParam(value="emailAddress") String emailAddress, @RequestParam(value = "message") String message) {
		try {
			expertusService.saveMessage(  firstName,  lastName,  phone, 
					  emailAddress, message);
			
		} catch (Exception e) {
			
		}
		return "Save Successfullly";
	}
	
}
