import { Account } from './../interfaces/account';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  account: Account = {
    email : '',
    password : '',
    passwordConfirmation: ''
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  signup() {
    if (this.account.email === '' || this.account.email === '' || this.account.passwordConfirmation === '') {
      alert('必須項目が入力されていません');
      return;
    }
    if (this.account.password !== this.account.passwordConfirmation) {
      alert('パスワードが異なります');
      return;
    }
    this.authService.signup(this.account.email, this.account.password);
  }

}
