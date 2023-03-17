# Final project for FS React and Django  

## Assignment description

### Create a flight ticketing app

Mandatory requirements:  

* Front end with React.js
* Back end with Django
* A User should be able to search a flight and book a flight from any country  
* Once flight is booked, seat vacancy on the flight should be updated respectively  
* Create 'customer' and 'supplier' roles. Additional roles at your discretion
* The user "role" should effect functionality and access

Optional:

* Use additional libraries
* Use Redux.js
* Authentication

****
**My take** on this project was challenge myself to implement what was learned but also to Explore new areas.  
A great effort went into setting goals, research, questioning methods, searching for best practices, scrapping and re-writing.  

**The concept** is to offer the user a destination based on how far she, he or they would like to travel. once the user passes the departure location the app will present all possible destinations on an interactive Bar chart.  

## App's tech stack

* JavaScript
* React.js
* Redux.js
* CSS
* HTML
* Django

Other libraries:

* Axios
* Material UI
* Charts.js
* GeoPy
* Pandas

### Project Layout

```
backend
├── core
├── flight_app
│   ├── management
│   │   └── commands
│   ├── migrations
│   ├── utils
│   │   └── db_utils
│   └── views
│       ├── admin
│       ├── auth
│       ├── flight_search
│       ├── general_views
│       ├── supplier_views
│       └── user
└── images



frontend
├── public
└── src
    ├── assets
    ├── components
    │   ├── account
    │   ├── booking
    │   ├── chart
    │   ├── coutry-card
    │   ├── flight-search-components
    │   ├── form-input
    │   ├── logo
    │   ├── nav
    │   ├── PopUpDialog
    │   ├── register
    │   ├── search-autocomplete
    │   ├── sign-in
    │   ├── sign in popup
    │   ├── slider input
    │   └── tabel
    ├── context
    │   ├── admin
    │   ├── airline_company
    │   ├── airlines
    │   ├── auth
    │   ├── locations
    │   │   ├── airports
    │   │   └── countries
    │   ├── trip
    │   └── user
    ├── pages
    ├── screens
    │   ├── admin-dashboard
    │   ├── airline-dashboard
    │   └── user-client
    ├── theme
    └── utils
        └── api

```

### Installation and running

* clone/ copy the repo  
* `cd` to frontend folder and `npm i`  
* at frontend folder, start frontend with `npm start`
* `cd` to backend folder and create a python virtual env  
* at backend folder after env is set and activated `pip install -r requirements.txt`  
* at backend start backend with `{your python} manage.py runserver`
