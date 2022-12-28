# AngularSAProject

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
	1.Acasa
		1.1 Header
		 - Welcome Section
		 - Slider
		1.3 Button
		1.4 3xCard
		1.5 Footer
	2.Despre noi
		2.1 Header
		 - Welcome section
		2.2 2 x Card
		2.3 Footer
	3.Contact
		3.1 Header
		 - Welcome section
		 - Informatii generale
		 - Formular
		3.2 Footer
		
## TODO:
	- Components
		- Home:
			- integrate all buttons component
			- integrate all cards component
			- new API get (firebase)
		- About us:
			- hide main body if burger menu opened
		- Contact:
			- hide main body if burger menu opened
			- form validation and submit functionality
				- replace button element with component
		- Footer:
			- form validation and submit functionality
				- replace button element with component
			- insert current year in the footer text
	- General:			
		- implement routing
			- configure all routes
 		- solve images problems due to stackblitz limitation (including favicon)
		- prettyprint/clean the code

## TO DOne:
	- General:
		- deploy build on netlify
		- add netlify link to readme
	- Components
		- Header:
			- hide main body if burger menu opened
		- Footer:
			- hide links if burger menu opened
			- replace svg icons with fontawesome icons
		- Home:
			- slider adjust