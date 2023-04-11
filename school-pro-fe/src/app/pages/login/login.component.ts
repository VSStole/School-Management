import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
// import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // reactiveForm!: FormGroup;
  // onSelected(): void {
  // }

 
  constructor(private authService: AuthService,private router:Router,) {}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("admin@best.com", [Validators.required]),
      password: new FormControl("1112223", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }



   login(): void {
    // console.log('999')
     this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe();

      Swal.fire({
        title: 'You Are Logged in',
        icon: 'success',
        confirmButtonText: 'Close'
      })
 
  }



  showControlError(form: FormGroup,controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }

}
  

 