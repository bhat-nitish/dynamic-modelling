# dynamic-modelling
Create dynamic forms based on complex param types and values with angular and material

# Tech Stack

1. Angular 8
2. .NET Core 3.1
3. MySQL

# How to run 

1. Install Node Angular CLI.
2. Install .NET Core 3.1 Runtime ( sdk in case of development).
3. Install MySql.
4. Create a mysql database. ( create database database_name).
5. The /db folder has tables and seed data. Run the table queries first to create necessary tables. Once the necessary tables are created, run the seed-data scripts.
6. update the modelling_repo_host,database,username and password in launch_settings.json in the /api/Modelling/Properties with the mysql host (localhost in case of dev), the username, password and database. Use the details from #3.
7. Navigate to /api/Modelling folder and run dotnet build.
8. Navigate to api/Modelling golder and run dotner run ( the api should be running i localhost:5000.
9. Navigate to ui folder - run npm install follwed by ng serve.


# Feature

This is a poc to create dynamic forms on the ui based on a json. The code uses a hypothetical modelling scenario which has a set of models and associated parameters. 

The project uses formly-forms and angular material stepper. The angular material stepper is used to navigate the user through a series of steps and the formly forms are used to create and update the forms dynamically.

The api integration is minimal and has a couple of basic get/post calls. Observables are used. The project also uses debouncing for search.
