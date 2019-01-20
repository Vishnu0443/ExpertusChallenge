import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  constructor(private _fb: FormBuilder, private _http: HttpClient, private _flashMessagesService: FlashMessagesService){
    this.messageForm = this._fb.group({
      _firstName:['',[Validators.required]],
      _lastName:['',[Validators.required]],
      _emailAddress:['',[Validators.required]],
      _phoneNumber:['',[Validators.required]],
      _textmessage: ['',[Validators.required]]
    })
  }
  ngOnInit(){
      this.GetClientInfo().subscribe((data:any)=>{
        if(data != null || data!= undefined){
          this.ClientInfo = data;
          this.CurrentLocation = data.city;
          this.GetWeatherInfo(data.country_code).subscribe((data:any)=>{
            if(data != null || data!= undefined){
              this.weatherInfo = data;
              this.Temp = data.main.temp;
              this.pressure = data.main.pressure;
              this.Humidity= data.main.humidity;
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
      var data = "FirstName=" + FirstName + "&LastName="+LastName + "&Phone=" + Phone+ "&EmailAddress=" + EmailAddress;
      var requestHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
      var Url="";
      this._http.post<any>(Url, data, {headers:requestHeader}).subscribe((data:any)=>{
        return data;
      });
    }
   
  }
}
