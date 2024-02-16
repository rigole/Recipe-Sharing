import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { UserService} from '../user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  inSubmission = false
  userInfo = false
  userId = ''
  modalValue: string = '';
  
  username: any = ''
  
  constructor(private userService:UserService){}
  ngOnInit() {

    this.userInfo = this.isAuthenticated()
    this.username = localStorage.getItem("username")

  }

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













































  isAuthenticated(): boolean{
    return !!localStorage.getItem('userInfo')
  }

  changeIcon(){}

  login(){
    this.inSubmission = true
    this.userInfo = true
    this.userService.userLogin(this.emailLogin.value, this.passwordLogin.value).subscribe(response => {
      this.userId = response.user_token
      localStorage.setItem("usertoken",this.userId)
      this.modalValue = "modal";
      console.log(response)
      this.username = response.user_name
      localStorage.setItem("username", this.username)
    })
  }

  subscribe(){
    //BlueWindow2024
    this.inSubmission = true
    this.userInfo = true
    this.userService.userSubscribe(this.name.value, this.email.value, this.password.value).subscribe(response => {
      this.userId = response.user_token
      localStorage.setItem("usertoken", this.userId)
      this.modalValue = "modal";
      this.username = response.user
      localStorage.setItem("username", this.username)
    });
  }

  signOut(){
    this.userInfo = false
    localStorage.removeItem('userInfo')
    localStorage.removeItem('usertoken')
  }

}
