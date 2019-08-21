# Jobly
Jobly is a web application for posting, viewing, and applying to job applications.
Jobly uses React for frontend and Node for backend.


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
