//Display and Edit a team

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { AnonymousSubject } from 'rxjs/Subject';

import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [DataService]
})

export class TeamComponent implements OnInit {

    //Data on team pulled from database for display
    teamInfo:Object;

    //Edited team info. Used in update routine.
    editedTeamData:any = {};

    //Name of team currently displayed.
    teamName:string;

    //Used to control if editing functionality is displayed
    showEdit:boolean;

    editButtonText = "Edit Team";

  
  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private router: Router
            ) 
  {

    this.showEdit = false;            
 }

  ngOnInit() {

  //Grab team name to be deisplayed from url
   this.teamName = this.route.snapshot.paramMap.get('teamName');
   
   //Grab data from database associated with team name
   this.dataService.displayTeam(this.teamName)
        .subscribe( (data)=> {
          console.log('fetched data is',data);
          this.teamInfo = data;
        });

  } //ngOnInit


  //Update team information
  updateTeamInfo(modTeamInfo:any):void {

    console.log('modTeamInfo is',modTeamInfo);

    this.editedTeamData.teamName = modTeamInfo.editTeamName;
    this.editedTeamData.dateFounded = modTeamInfo.editDateFounded;
    this.editedTeamData.city = modTeamInfo.editCity;
    this.editedTeamData.championships = modTeamInfo.editChampionships;
    this.editedTeamData.stadiumName = modTeamInfo.editStadiumName;
    this.editedTeamData.stadiumCapacity = modTeamInfo.editStadiumCapacity; 
    
    console.log(this.editedTeamData);
    this.dataService.updateTeam(this.editedTeamData)
          .subscribe( (result)=> {
            alert('Record has been updated');
            this.router.navigate(['/showAll']);
          });

   }


 //Delete team which is currently being displayed
 deleteTeam():void  {
   console.log('teamName for delete is', this.teamName);
   this.dataService.deleteTeam(this.teamName)
     .subscribe((data) => {
       console.log(data);
       alert('Record has been deleted');
       this.router.navigate(['/showAll']);
     });

 }


 //Allow toggling of edit capability
 showEditForm():void {

   if (this.showEdit) 
   {
     this.showEdit = false;
     this.editButtonText = "Edit Team";
   }
   else 
   {
     this.showEdit = true;
     this.editButtonText = "Close Edit";
   }
  

 }


 //Return to main application page
 goToMain():void {

    this.router.navigate(['/showAll']);

 }



}
