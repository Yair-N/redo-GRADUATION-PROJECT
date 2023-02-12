# Final project for FS React and Django  

## assignment requirements

### create a flight ticketing app using React as frontend and Django as backend  

app must have a database with tables for:  

1. User.  
2. Airline.  
3. Flight.  
4. Country.  

****

**My take on this project** was to use it as a platform to discover and practice new technics and expend my knowledge beyond what was learned in this course.  
a great portion of time went into setting goals, questioning methods and researching for best practice.  
Im sure there are better ways to do it but this is a learning experience I must go through.  

**The Idea for the app** is to offer the user a destination based on how far she or he would like to travel.

The app's data base has the location of countries and airports and can suggest the possibilities  
one would have based on its departure location by calculating the distances of possible destinations  
and presenting them on a bar graph under the range selection bar.  

after selecting the range, a list of countries and airports on that range will show  and the user can choose what the destination airport would be for the ticket search.  

### additional features I implemented but were not required

* state is managed with Redux.js
* authentication use of refresh token
* mock data population with commands on backend for demo

### Installation and running

* clone/ copy the repo  
* `cd` to frontend folder and `npm i`  
* at frontend folder, start frontend with `npm start`
* `cd` to backend folder and create a python virtual env  
* at backend folder after env is set and activated `pip install -r requirements.txt`  
* at backend start backend with `{your python} manage.py runserver`
