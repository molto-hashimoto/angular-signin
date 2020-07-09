import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = this.afAuth.user;
  emailSent = false;
  errMsg: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async sendEmailLink(email: string) {
    const actionCodeSettings = {
      url: 'http://localhost:4200/loading',
      handleCodeInApp: true,
    };
    try {
      await this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      this.emailSent = true;
      alert('ログイン用リンクを送信しました')
    }
    catch (err) {
      this.errMsg = err.message;
    }
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
        await this.afAuth.signInWithEmailLink(email, url)
          .then(result => {
            this.router.navigate(['room']);
          })
          .catch(err => {
            alert('ログインに失敗しました。\n' + err);
            this.router.navigate(['login']);
          });
        window.localStorage.removeItem('emailForSignIn');
      }
    }
    catch (err) {
      this.errMsg = err.message;
    }
  }

  signup(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(auth => {
        auth.user.sendEmailVerification();
      })
      .then(() => {
        alert('確認メールを送信しました');
        this.logout();
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert('アカウント作成に失敗しました');
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      }
    );
  }
}
