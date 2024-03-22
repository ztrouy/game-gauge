# Game Gauge
## Problem Solved
Groups of friends often have trouble deciding on what game to play once everyone is able to get together. For some, this process can eat up a considerable amount of time. 

This website aims to help streamline the process by:
- Figuring out which games everyone owns
- Filtering out games that don't support the number of friends playing
- Offer a solution to further filter and randomly pick games from the curated list

## Database
[Capstone Database GitHub Repository](https://github.com/ztrouy/frontend-capstone-api)

## Technologies Used
- ReactJS
- JavaScript
- HTML5
- CSS3
- MUI v5
- Vite

## Installation and Setup Instructions
Clone this repository, and the [Database](https://github.com/ztrouy/frontend-capstone-api) repository. You will need [node](https://github.com/nodejs/node), [npm](https://github.com/npm/cli), and [json-server@0.17.4](https://github.com/typicode/json-server) installed globally on your machine.
#### Installation:
Navigate to the cloned directory for this repository, and run
```
npm install
```
#### Run Database:
Navigate to the cloned directory for the [database](https://github.com/ztrouy/frontend-capstone-api) repository, and run
```
json-server database.json -p 8088
```
#### Run Website:
Navigate to the clonsed directory for this repository, and run
```
npm run dev
```
Then navigate to [http://localhost:8088](http://localhost:8088)

## Essential Structure
Game Gauge consists of several key features:
#### Creating Your Game Library
From the Games view, you can:
- Add a game to your library
- Remove a game from your library
#### Creating and Editing Games
As an employee, you can:
- Create new games to add to the overall collection of games users can add to their library
- Edit existing games in the overall collection to correct innacurracies or mirror changes made in updates
#### Creating and Editing Groups
As either an employee or user, you can:
- Create a new group for other users to join you in
- Edit the name of an existing group you made (or any group as an employee)
#### Joining, Leaving, and Opening Groups
From the Groups view, you can:
- Join an existing group, adding yourself to its list of members
- Leave an existing group, removing yourself from its list of members
- Open a group you are a member of
#### Choosing a Game to Play
From the Detailed Group view you get to by opening a Group you are a Member of, you can:
- See this list of games shared by all members that support the current amount of members
- Randomly select a game from the list to see if players are up for playing it
- Temporarily remove games from the list of games randomly rolled if one or more members aren't interested in them
## Wireframe
[Project Wireframe](https://www.figma.com/file/xvIkkKXHx2WotgPzCFXf2m/Frontend-Capstone?type=design&node-id=0%3A1&mode=design&t=pkQQMsO8f5dtyp69-1)

## ER Diagram
[Entity Relationship Diagram](https://dbdiagram.io/d/Web-Capstone-Stretch-Goals-65f070d9b1f3d4062cbce65c)

## Reflection
In this capstone project, I was able to implement CRUD functionality, navigation between React components using React-Router, and styling throughout my website using Material UI.

My primary challenge was properly handling how to build up layers of dependant information over multiple renders, useEffects, and fetch calls. 

I plan to eventually implement filtering options while in an opened Group, and utilize unit testing to verify the integrity of components to increase robustness. 
