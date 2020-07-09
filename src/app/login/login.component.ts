import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$ = this.authService.user$;
  email: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {  }
  sendEmailLink() {
    if (this.email === '') {
      alert('必須項目が入力されていません');
      return;
    }
    this.authService.sendEmailLink(this.email);
  }
}
