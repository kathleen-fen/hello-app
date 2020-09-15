import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginMode = true;
  error: string = null;
  authForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    const firstName = this.authForm.value.firstName;
    const lastName = this.authForm.value.lastName;
    if (this.loginMode) {
      this.authService.signIn(email,password).subscribe((people) => {
        console.log(people);
        this.error = null;
        this.router.navigate(['main']);
      })
    } else {
      this.authService.signUp(email,password, firstName, lastName).subscribe((key) => {
        console.log('key: ', key);
        this.error = null;
        this.router.navigate(['main']);
      }, err => {
        console.log(err)
        if (err.target.error.code === 0) {
            this.error = "This email exists already!"
        } else {
          this.error = err.target.error.message
        }
      })
    }
    this.authForm.reset();
   // console.log(this.authForm.value);
  }

  changeMode() {
    this.loginMode = !this.loginMode
  }

}
