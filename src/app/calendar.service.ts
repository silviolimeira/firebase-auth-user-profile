import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventEmitter } from "events";
import { environment } from "src/environments/environment.prod";

export interface CalendarEvent {
  summary: string;
  title: string;
  category: string;
  writer: string;
}

@Injectable({
  providedIn: "root"
})
export class CalendarService {
  url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";

  constructor(private http: HttpClient) {}

  // createArticle(article: Article): Observable<Article> {
  //     let httpHeaders = new HttpHeaders()
  //         .set('Content-Type', 'application/json');
  //     let options = {
  //         headers: httpHeaders
  //     };
  //     return this.http.post<Article>(this.url, article, options);
  // }

  // article: '{ summary: "Teste123", location: "Teste123", start: { dateTime: "2019-07-25T11:00:00.000-03:00", timeZone: "America/Sao_Paulo" }, end: { dateTime: "2019-07-25T11:25:00.000-03:00", timeZone: "America/Sao_Paulo" } }';

  postArticle(article: any, access_token: any): Observable<HttpResponse<any>> {
    let uri = this.url + "?access_token=" + access_token;

    /*
    https://accounts.google.com/o/oauth2/v2/auth?
    client_id=187637922392-nm8r2q89o9gub1ftmuos32coutiumkt1.apps.googleusercontent.com&
    response_type=code&
    scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline"
    */

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<string>(uri, article, {
      headers: httpHeaders,
      observe: "response"
    });
  }

  post1(article: any, access_token: any): Observable<HttpResponse<any>> {
    let url =
      "https://accounts.google.com/o/oauth2/v2/auth?" +
      "client_id=" +
      environment.googleWebClientId +
      "?" +
      "response_type=code&" +
      "scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost&access_type=offline";

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept"
    });
    article = {};
    return this.http.post<string>(url, article, {
      headers: httpHeaders,
      observe: "response"
    });
  }
  // getAllArticles(): Observable<Article[]> {
  //     return this.http.get<Article[]>(this.url);
  // }
}
