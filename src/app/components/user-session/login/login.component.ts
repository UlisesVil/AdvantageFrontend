import { Component, OnInit } from '@angular/core';
import { UserAuthModel } from '../../../models/userAuthModel';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../../utils/matchPassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:UserAuthModel;
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserAuthService,
    private _router: Router,
  ) {
    this.user = new UserAuthModel("","","","","");
    this.formCreate();
  }

  ngOnInit(): void {
  }

  formCreate(){
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [ Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/), Validators.required]],
      confirmPassword: ['', [Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/), Validators.required]],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSubmitlogin(){
    try {
      if(this.form.valid){
        this.user={
          userName: '',
          lastName: '',
          secondSurName:'',
          email: this.form.value.email,
          password: this.form.value.password
        }
        this._userService.login(this.user).subscribe(
          res=>{
            localStorage.setItem('token',res.token);
            localStorage.setItem('payload', JSON.stringify(res.payload));
            setTimeout(()=>{
              if(res.payload){
                this._router.navigate(['/user/user-main']).then(()=>{
                  window.location.reload();
                });
              };
            },3000);
          },error=>{
            console.log(<any>error);
          }
        );
      }
    } catch (error) {
        console.log(error);
    }
  }
}
