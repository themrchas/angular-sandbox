# Assignment #5- REST API



### Overview of Submission ###
```
The application is somewhat a continutation of Assignment 4 but adds a REST API for data manupulation.  Data can be accessed in two ways:
through a web interface (Assignment 4 specs) and via a REST API (Assignment 5). 

The REST API functional demonstration is performed via ajax in a HTML page using javascript.

The application presents a splash page to allow the user to select a Bundesliga soccer team.  The user can view the team's information or add 
a new team to the database.  If the user chooses to view a team, the page detailing team information allows the user to delete the team as wellas
edit the team's details.  The 'Home' button has the same functionality as cancel, in that the user is brought back to the splash page without
completing any CRUD operations.

The REST API functional demonstration is performed via ajax in a HTML page using javascript.

```

### Submission Details ###
```
The application can be started using 'npm run start-dev'to invoke nodemon with Chrome debugging and 'npm start' to run the app in traditional node manner.

.gitignore screens out all files/directories not required to run the application

nodemon is expected to already be installed globally on hosting server: npm install -g nodemon

* models/teamInfo.js contains the schema

* models/databaseRoutines.js contains the code used to access the database.  This file contains a class called 'dbRESTRoutines' which contains
the static methods corresponding to the REST API. This file also contains an anonymous function that provides connectivity to the database
as well as holdover functions from Assignment 4.

* views - contain the pug templates for web version as well as REST-Test.html and restTest.js which support accessing the database strictly via the REST API.
restTest.js uses ajax calls to the server to perform CRUD operations.  When using the REST-Test.html interface, there is limited functionality
in that it was created to show the REST API works. All operations except displaying all teams refer to a hard coded team, 'Team1'. The corresponding ajax 
calls use Team1 and pre-loaded Team1 information (found in functions making ajax calls).  

* routes/apiroutemap.js - the routing information for REST API. 

* routes/routemap.js - the routing information for the web interface (Assignment 4)



```
### Submission Comments ###
```
In a nutshell you can use both the web interface and ajax to manipluate the database. The web interface is based on assignment 4 criteria.
Assignment 5 criteria uses REST-Test.html and javascript to make REST calls to the database to perform CRUD operations.

While testing, I loaded REST-Test.html as a file in the browser URL input area and viewed the output of each operation in the broswer debugging console. There is also output sent to node process during operations in the form of status messages.

To use the REST-Test.html testing page ensure the ajax calls in restTest.js are pointing to correct server. The variable 'host'
in restTest.js is currently pointing to the node server running on DO.  If the ajax calls need to be pointed somewhere else, 'host' 
needs to be edited to the correct URL hosting the node server.


```





