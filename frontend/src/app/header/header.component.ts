import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  userInfo = false
  
  constructor(){}
  ngOnInit() {}

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  email = new FormControl('', [
      Validators.required,
      Validators.email
  ])

  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])

  registerForm = new FormGroup({ 
    name: this.name,
    email: this.email,
    password: this.password,
  })


  emailLogin = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  
  
  passwordLogin = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  
  
  loginForm = new FormGroup({ 
    emailLogin: this.emailLogin,
    passwordLogin: this.passwordLogin
  })















































  changeIcon(){}

  login(){}

  subscribe(){}

  signOut(){}

}
