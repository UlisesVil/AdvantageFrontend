import { AfterViewInit, HostListener } from '@angular/core';
import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { UserDataModel } from '../../../models/userDataModel';
import { UserMainService } from '../../../services/user-main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('canvasRef', {static:false}) canvasRef:any;
  private cx: CanvasRenderingContext2D;
  private points: Array<any>=[];
  public isAvailable:boolean;
  public width=400;
  public height=150;
  public imageToDownload:any;
  public img=false;
  public userData:UserDataModel;
  public form: FormGroup;
  public files:any =[];
  public uploadedFiles:Array<File> =[];
  public previsualization: string;
  public token:string;
  public user:any;
  public getUserData:any;
  public signature='no-image';
  public userDataId:string;
  public signatureMessage:string='Aun No cuentas con Firma Digital';

  @HostListener('document:mousemove',['$event'])
  onMouseMove=(e:any)=>{
    if(e.target.id==='canvasId' && (this.isAvailable)){
      this.write(e);
    }
  }

  @HostListener('click',['$event'])
  onClick = (e:any)=> {
    if(e.target.id==='canvasId'){
      this.isAvailable= !this.isAvailable;
    }
  }

  constructor(
    private _userMainService: UserMainService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dateAdapter: DateAdapter<Date>,
    private _sanitizer:DomSanitizer
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.userData = new UserDataModel("","","","","", new Date());
    this.formCreate();
  }

  ngOnInit(): void {
    this.menusInSession();
    this.getUser();
  }

  ngOnChanges(): void {
    this.menusInSession();
  }

  menusInSession(){
    this.token = localStorage.getItem('token');
    this.getUserData=localStorage.getItem('payload');
    if(this.getUserData!=null){
      this.user=JSON.parse(this.getUserData);
    };
  }

  ngAfterViewInit(): void{
    this.render();
  }

  formCreate(){
    this.form = this._formBuilder.group({
      userId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondSurName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthDate:['' ,[Validators.required]],
    });
  }

  getUser(){
    this._userMainService.getUser(this.user.id).subscribe(
      res=>{
        if(res.data){
          this.form = this._formBuilder.group({
            userId: [res.data._id, [Validators.required]],
            name: [res.data.userName, [Validators.required]],
            lastName: [res.data.lastName, [Validators.required]],
            secondSurName: [res.data.secondSurName, [Validators.required]],
            email: [res.data.email, [Validators.required]],
            birthDate:[res.data.birthDate ,[Validators.required]],
          });
          this.signature=res.data.signature;
          if(this.signature!=='no-image'){
            this.signatureMessage='Esta es tu Firma Guardada';
          }
          this.userDataId=res.data._id;
        }
      },error=>{
        console.log(<any>error);
        this.form = this._formBuilder.group({
        userId: [ this.user.id, [Validators.required]],
        name: [ this.user.userName, [Validators.required]],
        lastName: [ this.user.lastName, [Validators.required]],
        secondSurName: [  this.user.secondSurName, [Validators.required]],
        email: [  this.user.email, [Validators.required]],
        birthDate:[ this.user.birthDate ,[Validators.required]],
        });
      this.signature= 'no-image';
      }
    );
  }

  onSubmitData(){
    if(this.form.valid){
      this.userData={
        userId: this.form.value.userId,
        userName: this.form.value.name,
        lastName: this.form.value.lastName,
        secondSurName: this.form.value.secondSurName,
        email: this.form.value.email,
        birthDate: this.form.value.birthDate
      }
      this._userMainService.saveUserData(this.userData).subscribe(
        res=>{
          window.location.reload();
        },error=>{
          console.log(<any>error);
        }
      );
    }
  }

  private render():any{
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.cx.lineWidth=3;
    this.cx.lineCap='round';
    this.cx.strokeStyle='#000';
  }

  private write(res):any{
    const canvasEl:any = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPos={
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    }
    this.writeSingle(prevPos);
  }

  private writeSingle = (prevPos)=>{
    this.points.push(prevPos);
    if (this.points.length > 3){
      const prevPos = this.points[this.points.length -1];
      const currentPos = this.points[this.points.length -2];
      this.drawOnCanvas(prevPos, currentPos);
    }
  }

  private drawOnCanvas(prevPos: any, currentPos: any){
    if(!this.cx){
      return;
    }
    this.cx.beginPath();
    if(prevPos){
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  clean(){
    this.points=[];
    this.cx.clearRect(0,0,this.width, this.height);
  }

  imageDownload(){
    const canvasEl = this.canvasRef.nativeElement;
    this.imageToDownload=canvasEl.toDataURL();
    this.img=true;
  }

  fileCath(event): any{
    const fileCatched= event.target.files[0];
    this.extraerBase64(fileCatched).then((image:any) =>{
      this.previsualization= image.base
    })
    this.files.push(fileCatched);
    this.uploadedFiles=event.target.files
  }

  extraerBase64 =async ($event:any) => new Promise((resolve,reject)=>{
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this._sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base:reader.result
        });
        reader.onerror = error =>{
          resolve({
            base:null
        });
        }
      }
    } catch (error) {
      return null;
    }
  });

  onSubmitImage(){
    let formData= new FormData();
    for (let i=0; i<this.uploadedFiles.length; i++ ){
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name)
    }
    this._userMainService.uploadimgBase64({base64image:this.imageToDownload}).subscribe(
      res=>{
        this._userMainService.updateImageUrl({userId:this.userDataId, url:res.imageUrl}).subscribe(
          res=>{
            window.location.reload();
        });
    });
  }
}
