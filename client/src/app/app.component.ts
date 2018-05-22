import { Component, OnInit } from '@angular/core';

import { TeamsComponent } from './teams/teams.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'Bundesliga 2018!';
  titleComment = '';

  

  constructor()
  {}

  ngOnInit()
  {
     
  }


}
