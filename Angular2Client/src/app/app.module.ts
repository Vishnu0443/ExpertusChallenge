//Framework Components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Appcomponentservices} from './app.componentservices';
import { pipe } from '@angular/core/src/render3/pipe';
//User Defined Components
const appRoutes: Routes =[
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule,ReactiveFormsModule,HttpClientModule,FlashMessagesModule.forRoot()
  ],
  providers: [Appcomponentservices],
  bootstrap: [AppComponent]
})
export class AppModule { }
