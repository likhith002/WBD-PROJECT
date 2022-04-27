
# WBD PROJECT  DOCUMENTATION GROUP-17


## TITLE    
 Designing a website that sells electronic products such as AC,TV,Mobile,Desktop to users through website

 
## NAME
 ELECTRONICS MART
<a href="https://electronics-app.herokuapp.com/" target="_blank">WEB PAGE LINK</a>
#### INSTALLATION  PROCEDURE

####  Prerequisites
-   NodeJS
    
-   MongoDB
    
-   Mongoose
    
-   Middleware
    

		Multer

		Cors

		Morgan

-   Axios
    
-   Express
    
-   bcrypt
    
-   Swagger/Openapi 3.0
    
-   Json Web token


### After downloading the zipped file
For Running the website on local host
#### Unzip the file. There will be two folders 
1) electronicsmart-app
2) electronicsmart-backend

##### TO START THE SERVER
- Open the terminal 
- cd into electronicsmart-backend directory.
 - Now run `npm install` to install required dependencies.
- Make sure port 3002 is free and available for use. 
- now run `npm start` so that we can can run the backend  server on 3002 port

##### TO START THE REACT APP
- Open the terminal 
- cd into electronicsmart-app directory.
 - Now run `npm install` to install required dependencies.
- Make sure port 3000 is free and available for use. 
- now run `npm start` so that we can can run the frond end on 3000 port

- Now run “npm start” to start the Development Server.
 
- Our app will be accessible on  http://localhost:3000

For hosting the website on heroku

### After downloading the zipped file

- Copy and Paste the electronicsmart-app folder inside the electronicsmart-backend folder and then delete the  electronicsmart-app folder outside the electronicsmart-backend folder.
- We need to tell the Heroku to serve the statics files of the electronicsmart-app.
- We need to add few scripts on the Server package.json files in order to tell Heroku, what to do and what not to.
- Once all above steps completed, then we will create an application on Heroku.
- Once login then go to Heroku website to create an Heroku app to host our project.
	- run heruko login 
	- git init
	- heroku git:remote -a electronics-app
	- git add .
	- git commit -am " "
	- git push heroku master:main
- Once you create simply open the Heroku app .




## TEAM MEMBERS
### S20190010008  ANNEPU LIKHITH BHARADWAJ
### S20190010001  A PRANAY
### S20190010005  ALLATIPALLI NAGA SAI LOKESH REDDY
### S20190010011  ARYAN NIKHIL PHULKAR
### S20190010070  JATOTH BHARATH CHANDRA
