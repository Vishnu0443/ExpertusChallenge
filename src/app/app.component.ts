import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private _fb: FormBuilder, private _http: HttpClient){
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
    this.messageForm.value._firstName
    this.messageForm.value._lastName
    this.messageForm.value._phoneNumber
    this.messageForm.value._emailAddress
  }
}
