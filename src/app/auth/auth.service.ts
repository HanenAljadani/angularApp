import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.module";



export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; //? means optional
} 
@Injectable({providedIn: 'root'})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    
    constructor(private http: HttpClient,
        private router:Router){

    }
    signup(FName: string , LName : string , email: string , password: string){
       return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAh3ZmnRtfe2enntUV5t5kIOeVVrL0hh20',
            {
                FName: FName,
                LName: LName,
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),tap(resData =>{
                this.handleAuthentication(resData.email,resData.localId , resData.idToken, +resData.expiresIn);
            }) 
            
            ) ;
     
    }
    
    login(email:string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAh3ZmnRtfe2enntUV5t5kIOeVVrL0hh20',{
            email:email,
            password:password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData =>{
            this.handleAuthentication(resData.email,resData.localId , resData.idToken, +resData.expiresIn);
        })
        ) ;

    }

    private handleAuthentication(email:string,userId:string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime()  + expiresIn * 1000);
        const user = new User(
           email , 
           userId, 
           token,
            expirationDate);
            this.user.next(user);
            //localStorage (in the web storage )
            localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            //we can write only one, but this is good for practice
            case 'EMAIL_EXISTS':
                errorMessage = 'This email existe already';
                break;
            case 'EMAIL_NOT_FOUND':
               errorMessage = 'This email does not exist' ;
               break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct' ;
                break;
        }
        return throwError(errorMessage);
       }

       logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData'); // clear the user data from website
        
    }

/*

    //response for users sign in and sign up

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap } from "rxjs";
import { throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "./user.module";

export interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; //? means optional
}
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router:Router){}

    signup(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,{
             email:email,
             password:password,
             returnSecureToken: true

       }).pipe(catchError(this.handleError),tap(resData =>{
           this.handleAuthentication(resData.email,resData.localId , resData.idToken, +resData.expiresIn);
       }) 
       
       ) ;

    }
    login(email:string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,{
            email:email,
            password:password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData =>{
            this.handleAuthentication(resData.email,resData.localId , resData.idToken, +resData.expiresIn);
        })
        ) ;

    }
    autoLogin(){
     const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate:string;
     }= JSON.parse(localStorage.getItem('userData')) ;
     if(!userData){
        return;
     }
     const loadedUser= new User(userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));

    if(loadedUser.token){

        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
        - new Date().getTime();
        this.autoLogout(expirationDuration);
    }  
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData'); // clear the user data from website
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null; 
    }

    //Timer to logout
    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=> {
            this.logout();
        }, expirationDuration) ;
    }
    private handleAuthentication(email:string,userId:string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime()  + expiresIn * 1000);
        const user = new User(
           email , 
           userId, 
           token,
            expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            //localStorage (in the web storage )
            localStorage.setItem('userData', JSON.stringify(user));
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            //we can write only one, but this is good for practice
            case 'EMAIL_EXISTS':
                errorMessage = 'This email existe already';
                break;
            case 'EMAIL_NOT_FOUND':
               errorMessage = 'This email does not exist' ;
               break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct' ;
                break;
        }
        return throwError(errorMessage);
       }
    }*/

}