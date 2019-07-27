import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "helper";
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection("items").valueChanges();
  }
}
