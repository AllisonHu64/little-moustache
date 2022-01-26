import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _isLogin = false;
  private _loginCheckSubscription: Subscription | null = null;

  constructor(public _dialog: MatDialog, private _userService: UserService, private _router: Router) {
  }

  ngOnInit(): void {
    this._loginCheckSubscription = this._userService.loginCheck().subscribe((resp:any)=>{
      if (resp.errno === 0){
        this._isLogin = true;
      } else {
        this._isLogin = false;
      }
    })
  }

  ngOnDestory(): void {
    this._loginCheckSubscription?.unsubscribe();
  }

  login(): void {
    const dialogRef = this._dialog.open(LoginDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this._isLogin = true;
      }
    });
  }

  getCookieExpires():string {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toUTCString();
  }

  onAccountClick(){
    this._userService.loginCheck().pipe(first()).subscribe((resp:any)=>{
      if (resp.errno === 0){
        this._router.navigate(["/admin"])
      } else {
        this.login();
      }
    })
  }

  get isLogin(){
    return this._isLogin;
  }

  onSignupClick(){
    window.alert("Please contact allison hu at pan.hu46@gmail.com to set up an account for you.")
  }



}
