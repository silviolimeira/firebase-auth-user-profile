import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { CalendarService } from "./calendar.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "helper";
  items$: Observable<any[]>;
  access_token: string;
  constructor(
    db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private calendarService: CalendarService,
    private httpClient: HttpClient
  ) {
    this.items$ = db.collection("students").valueChanges();


    this.afAuth.auth.getRedirectResult().then(res => {
      console.log(res);
      // console.log(res.credential);
      // if (res.credential) {
      // let tmp = res.credential.toJSON();
      // console.log("tmp: ", tmp);

      let credential = res.credential;
      // console.log("credential: ", credential);
      // console.log(credential);

      this.access_token = res.credential["accessToken"];

      console.log("access_token: ", this.access_token);
      // var token
      // }
    });    
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    // provider.addScope("openid");
    // provider.addScope("https://www.googleapis/auth/plus.login");
    // provider.addScope("https://www.googleapis.com/auth/calendar");
    // provider.addScope("https://www.googleapis.com/auth/calendar.readonly");
    provider.addScope("https://www.googleapis.com/auth/calendar.events");
    // provider.addScope("https://www.googleapis.com/auth/calendar");
    // provider.addScope(
    //   "https://www.googleapis.com/auth/calendar.events.readonly"
    // );
    // provider.addScope(
    //   "https://www.googleapis.com/auth/calendar.settings.readonly"
    // );
    // provider.addScope(
    //   "https://www.googleapis.com/auth/calendar.addons.execute"
    // );

    const credential = await this.afAuth.auth.signInWithRedirect(provider);
  }

  async googleSignOut() {
    await this.afAuth.auth.signOut();
  }

  makeRequest() {
    console.log("makeRequest");
    this.calendarService
      .postArticle(
        '{ summary: "Teste123", location: "Teste123", start: { dateTime: "2019-12-25T11:00:00.000-03:00", timeZone: "America/Sao_Paulo" }, end: { dateTime: "2019-12-25T11:25:00.000-03:00", timeZone: "America/Sao_Paulo" } }',
        this.access_token
      )
      .subscribe(res => {
        console.log("res: ", res);
      });

    // let res = this.calendarService
    //   .post1("{}", this.access_token)
    //   .subscribe(res => console.log("res: ", res));
  }
}
