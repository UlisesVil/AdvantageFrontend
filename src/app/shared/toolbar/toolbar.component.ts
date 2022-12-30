import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public token:string;
  public userData:any;
  public getUserData:any;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.menusInSession();
  }

  ngOnChanges(): void {
    this.menusInSession();
  }

  menusInSession(){
    this.token = localStorage.getItem('token');
    this.getUserData=localStorage.getItem('payload');
    if(this.getUserData!=null){
      this.userData=JSON.parse(this.getUserData);
    };
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('payload');
    this._router.navigate(['']).then(()=>{
      window.location.reload();
    });
  }

  mainUser(){
      this._router.navigate(['/user/user-main']).then(()=>{
      window.location.reload();
    });
  }
}
