import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service'
import { Observable, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  loginMode = true;
  error = null;
  subError: Subscription;
   // subError: Subscription;
   authForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.authService.error$);
    this.subError = this.authService.error$.subscribe(er => {
      this.error = er;
      console.log(this.error)
    });
    
    this.setUpValidation();
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
        //this.error = null;
        this.router.navigate(['main']);
      })
    } else {
      this.authService.signUp(email,password, firstName, lastName).subscribe((key) => {
        console.log('key: ', key);
        //this.error = null;
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
  }

  changeMode() {
    this.loginMode = !this.loginMode;
    this.authForm.reset();
    this.setUpValidation();
  }

  setUpValidation() {
    if (!this.loginMode) {
      this.authForm.get('firstName').setValidators(Validators.required);
      this.authForm.get('lastName').setValidators(Validators.required);
    } else {
      this.authForm.get('firstName').setValidators([]);
      this.authForm.get('lastName').setValidators([]);
    }
  }

}
