# Inside Maps API

Node Token-based Authentication REST APIs fro Inside Maps API. Software Engineering project, 2020.

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger) 


## Table of Contents
- [Inside Maps API](#inside-maps-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone](#clone)
    - [Setup](#setup)
  - [Features](#features)
  - [Routes](#routes)
  - [Team](#team)
  - [License](#license)



---

## Installation


### Clone

- Clone this repo to your local machine using `https://github.com/gusmendez99/InsideMaps-API`

### Setup

- Run `yarn install` to install required packages 
- Open terminal run `yarn start`
--- 

## Features
- Express.js server using MongoDB

## Routes

Here are the main routes used in the API

* GET (users list)	  **/api/v1/user**
* GET (user profile)	  **/api/v1/user/id**

*  Auth
   * Email Register (POST)
      * http://localhost:4000/api/v1/auth/signup/
   * Login (POST)
      * http://localhost:4000/api/v1/auth/signin/  

* User
   * Get Users (GET)
      * http://localhost:4000/api/v1/user/  
   * Get User (GET)
      * http://localhost:4000/api/v1/user/id/  
   * Update User (PUT)
      * http://localhost:4000/api/v1/user/id/  
   * Delete User (DELETE)
      * http://localhost:4000/api/v1/user/id/

*  Maps
   * Get Maps (GET)
      * http://localhost:4000/api/v1/map/  
   * Get single Map (GET)
      * http://localhost:4000/api/v1/map/id/ 
   * Get Markers from a Map (GET)
      * http://localhost:4000/api/v1/map/id/markers/ 
   * Create Map (POST)
      * http://localhost:4000/api/v1/map/ 
   * Update Map (PUT)
      * http://localhost:4000/api/v1/map/id/  
   * Delete Map (DELETE)
      * http://localhost:4000/api/v1/map/id/
*  Markers
   * Get Markers (GET)
      * http://localhost:4000/api/v1/markers/  
   * Get Markers by Name (GET)
      * http://localhost:4000/api/v1/marker/?name=nameToSearch/ 
   * Create Marker (POST)
      * http://localhost:4000/api/v1/marker/      
* Navigation
   * Find Shortest Path Betweetn Places
      * http://localhost:4000/api/v1//navigation/find-shortest-path/id/


## Team

| Gustavo Mendez | Luis Urbina | Michel Benvenuto |
| :---: |:---: | :---: |
| [![Gustavo](https://avatars0.githubusercontent.com/u/19374517?s=200&u=c1481289dc10f8babb1bdd0853e0bcf82a213d26&v=4)](http://github.com/gusmendez99)    | [![Urbina](https://avatars3.githubusercontent.com/u/35355445?s=200&u=851bb2374c95ac3baaaca3de5f51212441ebff57&v=4)](http://github.com/virtualmonkey) | [![Michele](https://avatars0.githubusercontent.com/u/35434145?s=460&v=4)](https://github.com/michelebenveuto) |
| <a href="http://github.com/gusmendez99" target="_blank">`github.com/gusmendez99`</a> | <a href="http://github.com/virtualmonkey" target="_blank">`github.com/virtualmonkey`</a> |<a href="https://github.com/michelebenveuto" target="_blank">`github.com/michelebenveuto`</a> |

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="http://gusmendez99.github.io" target="_blank">Gus Mendez</a>, <a href="https://github.com/virtualmonkey" target="_blank">Luis Urbina</a> & <a href="https://github.com/michelebenveuto" target="_blank">Michele Benvenuto</a>.
   
