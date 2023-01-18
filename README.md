# Angular Software Academy Project

## Live version deployed here: https://angular-proiect-sa.netlify.app/

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Components Structure

    1. Home
    	1.1. Header
    	 - Welcome Section
    	 - Slider
    	1.3. Button
    	1.4. CardHome x3
    	1.5. Footer
    2. About
    	2.1. Header
    	 - Welcome section
    	2.2. CardAbout x3
    	2.3. Footer
    3. Contact
    	3.1. Header
    	 - Welcome section
    	 - Informatii generale
    	 - Formular
    	3.2. Footer
		4. My account
			4.1 Login
			4.2 Forgot password
			4.2 Register
			4.3 Verify email
			4.4 My Profile
			4.5 Programs
			4.6 Contacts
			4.7 Newsletter
			4.8 Users


## TODO:
- Nice to have's:
	- loading screen
	- prettyprint/clean the code, replace any's with interfaces, etc..
	- bootstrap carrousel
	- home-card redesign as single, transfer *ngFor to parent component
	- about-card redesign as single, transfer *ngFor to parent component

## TO DOne:
- General:
	- deploy build on netlify
	- add netlify link to readme
	- routing:
		- implement routing
		- configure routes
		- page not found route
	- move images to firebase storage due to stackblitz limitation
	- move favicon to firebase storage due to stackblitz limitation
	- internationalization implementation (https://github.com/ngx-translate/core)
		- tranlate all texts
		- svg flags (source: https://github.com/lipis/flag-icons)
		- save language preferences to local storage as user preference
	- personalization: 
		- firebase authenticated users rules for database
		- My account component:
			-	route to redirect to login component if not logged
			- show/add/delete programs
			- show/delete/reply contacts
			- show subscribers
			- components reareange: users/programs/newsletter/contact outside myaccount, insert sign-in/sign-up...
			- translate all texts
- Components
	- Header:
		- hide main body if burger menu opened
	- Footer:
		- hide links if burger menu opened
		- replace svg icons with fontawesome icons
		- insert current year in the footer text
		- form
			- validation
			- submit functionality
  		- replace button element with component
	- Home:
		- slider adjust
		- integrate all buttons component
		- integrate cards component
		- new API get (firebase)
	- About us:
		- hide main body if burger menu opened
		- integrate cards component
	- Contact:
  	- hide main body if burger menu opened
		- replace icons
		- form
			- validation
			- replace button element with component
			- submit functionality