import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Registered User';

  displayname='';
  displayaddress='';
  displaycontact='';
  displayemail='';

  getValue(name:string, address:string, contact:string, email:string){
    this.displayname=name;
    this.displayaddress=address;
    this.displaycontact=contact;
    this.displayemail=email;
  }
}