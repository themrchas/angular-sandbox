import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  private apiUrl = environment.apiurl;

  constructor(private http:HttpClient) { }


  //Return all teams in the database
  listTeams() {

    return this.http.get(this.apiUrl + '/getTeams');
  }

  displayTeam(teamName:string) {

    return this.http.get(this.apiUrl + '/displayTeam?team='+teamName);
  }
  
  updateTeam(teamData:any)
  {
    return this.http.put(this.apiUrl + '/editTeam',teamData);
  }

  createTeam(teamData:any)
  {
    return this.http.post(this.apiUrl + '/addTeam',teamData);
  }

  deleteTeam(teamName:any)
  {
    
   return this.http.delete(this.apiUrl + '/deleteTeam/'+teamName);
  }


}
