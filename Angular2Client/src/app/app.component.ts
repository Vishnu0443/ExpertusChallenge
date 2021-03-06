import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map, filter, switchMap } from 'rxjs/operators';
import { Appcomponentservices} from './app.componentservices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messageForm: FormGroup;
  title = 'Hello Expertus!';
  ClientInfo: any;
  weatherInfo: any;
  CurrentLocation: string;
  Temp: number;
  pressure: number;
  Humidity: number;
  ErrorMessage: string;
  constructor(private _fb: FormBuilder, private _http: HttpClient, private _flashMessagesService: FlashMessagesService, private _services :Appcomponentservices){
    this.messageForm = this._fb.group({
      _firstName:['',[Validators.required]],
      _lastName:['',[Validators.required]],
      _emailAddress:['',[Validators.required]],
      _phoneNumber:['',[Validators.required]],
      _textmessage: ['',[Validators.required]]
    })
  }
  ngOnInit(){
      this.GetClientInfo().subscribe((Infodata:any)=>{
        if(Infodata != null || Infodata!= undefined){
          this.ClientInfo = Infodata;
          this.CurrentLocation = Infodata.city;
          var model ="model=" +JSON.stringify(this.ClientInfo);
          this._services.CallServicesClientInfo(model)
          .subscribe((dataapi: any)=>{
              console.log(dataapi);
          })   
          this.GetWeatherInfo(Infodata.country_code).subscribe((Wdata:any)=>{
            if(Wdata != null || Wdata!= undefined){
              this.weatherInfo = Wdata;
              this.Temp = Wdata.main.temp;
              this.pressure = Wdata.main.pressure;
              this.Humidity= Wdata.main.humidity;
            }
          })
        }        
      })
      
  }
  GetClientInfo(){
   var Info = this.ClientInfo =  this._http.get('http://api.ipstack.com/check?access_key=afe57d07d71520250475e0329195df5c');
   return Info;
  }
  GetWeatherInfo(countrycode){
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+this.CurrentLocation +','+countrycode+'&appid=439cff8b1553fdf182a8c4f478e8e554';
    var WInfo  = this.weatherInfo = this._http.get(url);
    return WInfo;
  }
  SendMessage(){
    if(!this.messageForm.valid){
      this._flashMessagesService.show('You must enter all the fields to submit the message.', {cssClass: 'alert-danger', timeout: 5000})
    }
    else{
      var FirstName = this.messageForm.value._firstName;
      var LastName = this.messageForm.value._lastName;
      var Phone = this.messageForm.value._phoneNumber;
      var EmailAddress = this.messageForm.value._emailAddress;
      var Message = this.messageForm.value._textmessage;
      var data = "firstName=" + FirstName + "&lastName="+LastName + "&phone=" + Phone+ "&emailAddress=" + EmailAddress + "&message=" + Message;
      this._services.CallServicesMessage(data)
      .subscribe((dataapi: any)=>{
          console.log(dataapi);
      });
    }  
  }

  
}
