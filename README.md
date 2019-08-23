# Jobly
Jobly is a web app for posting, viewing, and applying to job applications. Built with React and Express.

## Getting Started

1. Clone this repo to your local machine 
```
git clone https://github.com/joanne-wu-hoo/rithm-react-jobly
```
2. cd into the "backend" directory, install required packages, and start the server
```
cd backend
nodemon server.js 
```
  This will start the server on port 3001

3. cd into the "frontend" directory, install required packages, then start the app
```
cd frontend
npm install
npm start
```
  This will run your app on http://localhost:3000 

To run tests:
```
cd frontend
npm test
```

## App Information

### Routes
|Path | Component |
| :--- | :--- |
| / | Home  |
| /register  | Login  |
| /login  | Login  |
| /companies  | Companies  |
| /companies/:handle  | Company  |
| /jobs  | Jobs |
| /profile | Profile  |


### Component Architecture
```
App
└─┬─ NavBar
  └┬ Routes
   ├── Homepage
   ├── Login
   └─┬ PrivateRoutes 
     ├─┬ Companies
     │ ├── SearchBar
     │ └── CompanyCard 
     ├─┬ Company
     │ └── JobCard 
     ├─┬ Jobs
     │ ├── SearchBar
     │ └── JobCard
     └── Profile
```
