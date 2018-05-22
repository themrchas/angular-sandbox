import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { CreateTeamComponent } from './create-team/create-team.component';


const routes: Routes = [

  //Default path
  { path: '', redirectTo: '/showAll', pathMatch: 'full'},

  //Show individual team
  { path: 'showIndividual/:teamName', component: TeamComponent },  
  
  //Show all teams in the database
  { path: 'showAll', component: TeamsComponent },

  //Create new team
  { path: 'newTeam', component: CreateTeamComponent }, 
]


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamComponent,
    CreateTeamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
