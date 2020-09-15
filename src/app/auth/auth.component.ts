import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  error = null;
  
  subError: Subscription;
  subSignIn: Subscription;
  subSignUp: Subscription;
  authForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.subError = this.authService.error$.subscribe(er => {
      this.error = er;
    });
    
    this.setUpValidation();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return
    }
    
    if (this.loginMode) {
      this.subSignIn = this.authService.signIn(this.authForm.value).subscribe((people) => {
        this.router.navigate(['main']);
      })
    } else {
      this.subSignUp =this.authService.signUp(this.authForm.value).subscribe((key) => {
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
      this.authForm.get('firstName').setValidators([Validators.required]);
      this.authForm.get('lastName').setValidators([Validators.required]);
    } else {
      this.authForm.get('firstName').setValidators([]);
      this.authForm.get('firstName').updateValueAndValidity();
      this.authForm.get('lastName').setValidators([]);
      this.authForm.get('lastName').updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    if (this.subError) {
      this.subError.unsubscribe();
    }
    if (this.subSignIn) {
      this.subSignIn.unsubscribe();
    }
    if (this.subSignUp) {
      this.subSignUp.unsubscribe();
    }
  }
}
