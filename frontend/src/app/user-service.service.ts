import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}


  userLogin(email:any, password:any):Observable<any>{
    const user = { email: email}
    localStorage.setItem('userInfo', JSON.stringify(user))
    return this.http.post(`${this.backendUrl}/signin`, {email, password})
  }

  userSubscribe(name:any, email:any, password:any):Observable<any>{
    const user = { username:name, email: email }
    localStorage.setItem('userInfo', JSON.stringify(user))
    return this.http.post(`${this.backendUrl}/signup/`, {name, email, password})

  }
}
