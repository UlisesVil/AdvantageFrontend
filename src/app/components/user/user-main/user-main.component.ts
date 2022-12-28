import { Component, OnInit } from '@angular/core';
import { UserDataModel } from '../../../models/userDataModel';
// import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  public user:UserDataModel;
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    // private _userService: UserAuthService,
    private _router: Router,
    // private _route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.user = new UserDataModel("","","","", new Date());
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
      birthDate:['' ,[Validators.required]]
    });
  }

  onSubmit(){
    console.log(this.form.value);

  }

}
