import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  register = false;
  openApp =false;
  error:string;
  constructor(private router:Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
   if(!form.valid){//Extra validation
      return;
  }
    const email = form.value.email;
    const password = form.value.password;
    
    let authObs: Observable<AuthResponseData>;
    if(this.openApp){
        authObs= this.authService.login(email,password);
    }else{
      const FName  = form.value.FName;
      const LName = form.value.LName;
      authObs= this.authService.signup(FName,LName,email,password)
    }

    authObs.subscribe(
      resData =>{
        console.log(resData);
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
        this.error = 'An error occured!'
      }
    );
    /*
    if(this.openApp){
      this.authService.login();
  }else{
        this.authService.signup();
  }*/
  
  }
  clicked(){
    this.openApp = true;
  //this.router.navigate(['/home']);
  }
  registerd(){
    this.register = false;
  }
  signUp(){
    this.register = true;
  }

}
