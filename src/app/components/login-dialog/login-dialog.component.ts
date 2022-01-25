import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user/user.service';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  public hide = true;
  public username:string = "";
  public password:string = "";
  private _userLoginSubscription : Subscription | null = null;

  constructor(
    private _dialogRef: MatDialogRef<LoginDialogComponent>,
    private _userService: UserService
  ) {}

  onNoClick(): void {
    this._dialogRef.close(false);
  }

  onLoginClick(): void{
    this._userLoginSubscription = this._userService.login(this.username,this.password).subscribe((resp:any)=>{
      if (resp?.errno !== 0){
        this._dialogRef.close(false);
      } else {
        this._dialogRef.close(true)
      }
    })
  }

  ngOnDestroy() {
    if (this._userLoginSubscription){
      this._userLoginSubscription.unsubscribe();
    }
  }
}
