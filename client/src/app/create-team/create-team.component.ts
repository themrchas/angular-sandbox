//Component to create a new team

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
  providers: [DataService]
})
export class CreateTeamComponent implements OnInit {

  teamData:any = {};

  constructor(private dataService:DataService,
              private router: Router) { }

  ngOnInit() {
  }

  saveTeam():void {

    this.dataService.createTeam(this.teamData)
          .subscribe( (result)=> {
                console.log('result is ',result);
                alert('Record has been saved');
                this.router.navigate(['/showAll']);
    });

  }

}
