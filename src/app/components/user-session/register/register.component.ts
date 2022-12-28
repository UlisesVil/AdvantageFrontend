import { Component, OnInit } from '@angular/core';

import { UserAuthModel } from '../../../models/userAuthModel';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../../utils/matchPassword';
// import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user:UserAuthModel;
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserAuthService,
    private _router: Router,
    // private _route: ActivatedRoute,
  ) {
    this.user = new UserAuthModel("","","","","");
    this.formCreate();
  }

  ngOnInit(): void {
  }

  formCreate(){
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondSurName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/), Validators.required]],
      confirmPassword: ['', [Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/), Validators.required]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }



  onSubmit(){
    console.log(this.form.value);
    console.log(this.form.valid);

    if(this.form.valid){
      this.user={
        userName: this.form.value.name,
        lastName: this.form.value.lastName,
        secondSurName: this.form.value.secondSurName,
        email: this.form.value.email,
        password: this.form.value.password
      }
      this._userService.saveUser(this.user).subscribe(
        res=>{
          console.log(res.data);
          if(res.data){
            console.log('Bienvenido Usuario');
            // this._userService.login(this.user).subscribe(
            //   res=>{
            //     setTimeout(()=>{
            //       let userId=res.payload.id;
            //       this._router.navigate(['/mainCollaborator', userId])
            //       // .then(()=>{
            //       //   window.location.reload();
            //       // });
            //     },3000);
            //   },error=>{
            //     console.log(<any>error);
            //   }
            // );
          }

        },error=>{
          console.log(<any>error);
          console.log('log del error');
          //this.errorWarning=<any>error.error.message;
        }
      );
    }

  }

}
