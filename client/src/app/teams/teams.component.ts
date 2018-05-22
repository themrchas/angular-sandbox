//Displays all teams; serves as default page for app

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [DataService]
})
export class TeamsComponent implements OnInit {

  teamList;

  constructor(private dataService:DataService)
  {}

  ngOnInit()
  {
    
   this.dataService.listTeams()
        .subscribe( (teams)=> {
          console.log(teams[0]);
          this.teamList = teams;
        }); 
 
  }


  

}
