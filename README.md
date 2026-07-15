# Blocks

Blocks is a location-based capture-the-flag game. Players compete in teams to earn points, win games, and climb the leaderboard.

> **Project status:** Maintained as a portfolio demo. The code uses an older Next.js/Firebase stack and is preserved primarily as a record of the original class project.

- Demo: [blocks-jonathan-segals-projects.vercel.app](https://blocks-jonathan-segals-projects.vercel.app/)
- Source: [github.com/Jonathannsegal/blocks](https://github.com/Jonathannsegal/blocks)

![Banner image](/public/static/BlocksHeader.png)

## Local development

Run `yarn install` and `yarn dev`. The current portfolio build uses OpenStreetMap raster tiles and does not require a Mapbox access token.

## Intro

I took the class SE319, Construction of User Interfaces at Iowa State which has a project based component. My friend and I worked on a team to design, build, and release an app. I learned a lot about the application building process from Research, Design, Development and how all steps come together to deploy a finished product.

## Goals

##### 1. Gameplay

Capture the flag using user-generated maps, real-world player locations, and map objectives. Teams compete to capture objectives and gain points.

##### 2. Friends

High-score leaderboards for competing with friends, game discovery, multiplayer sessions, and in-game team chat.

##### 3. User Experience

A mobile-optimized experience for Android and iOS, with animation and an intuitive interface.

## THE PROJECT: Construction of a User Interface

Design and build an application with a strong user experience and a robust implementation that fulfills goals you define.
**—SE319**

##### The development process:

1. **Idea & Scope** — Goals, Planning
2. **Research & Proposal** - Resources, Tools
3. **Design & UML Diagrams** - Flow, Walkthroughs
4. **Development & Implementation** - Process, Programming
5. **Release & Feedback** - Deployment, Summary

## 01 - Idea & Scope

**Brainstorm ideas and create a realistic roadmap.**

After coming up with a few ideas for the application that we wanted to build. We went with rebuilding the project that we attempted to make at HackKU where we barely got started. The premise was location-based capture the flag.

Due to the amount of time that my teammate and I had for this project we decided to:

1. Build a `PWA` ( progressive web app ) to save time and reduce amount of code needed.
2. Move stretch goals such as multiple game modes and `AR` (augmented reality) to future tasks.

## 02 - Research & Proposal

**Discover resources and tools for development**

When researching tools for the project we found many options but chose to build a [React](https://reactjs.org/) app as we both had previous experience. For mapping we chose [Mapbox](https://www.mapbox.com/) over Google Maps as it has a better free tier and is very flexible and and easy to work with. Other tools that we used are: [Next.JS](https://nextjs.org/), [Firebase](https://firebase.google.com/), [Redux](https://redux.js.org/), [ReactSuite](https://rsuitejs.com/en/), [Lottie](https://airbnb.io/lottie/#/).

## Proposal

Our app is a cross-platform ( IOS, Android ) mobile game. Using React we can build a PWA for both platforms from one codebase. Our game leverages Location services to create an interactive game that uses interactions with the real world. The game will have user accounts that will be used to store personal information such as friend lists and device location.

The core gameplay will have users on a specified map interact with randomly generated cubes and move them to waypoints, collections, etc. There will be many features of customizability in the game such as maps, players, team numbers, and potentially more objects to interact with. Users will be able to join a game with either a friends list, by searching by username or QR code.

Once in the game, you will be able to chat with your team and see team stats such as how many cubes placed. After brainstorming a few ideas for the application that we wanted to build. We went with rebuilding the project that we attempted to make at HackKU where we barely got started. The premise was location-based capture the flag.

## 03 - Design & UML Diagrams

**Design a compelling user experience with concepts.**

- **Screen interactions outline**:
  - Creating a mental model of the application and how users will go through to get to the game.
- **Eliminating paint points**:
  - Streamlining onboarding and user flow from load to gameplay.
- **Scope out all functionality**:
  - Draw out the states of the application to better understand and layout the development process.

**Mapping out task flows.**

An overview mapping of how the task flows worked transitioning from screen to screen

1. Onboarding
2. Game

   - Creation

   ![](/public/static/blocks-creategame.png)

   - Search

3. leaderboard
4. Gameplay

## 04 - Development & Implementation

<!-- Next.JS, React, Firebase, -->

![](/public/static/blocks-trello.png)

### Process

For project management, we used `Trello` to keep track of tasks and development cycles. All code was saved on Iowa State's Gitlab server and after the class, I uploaded the repository to my GitHub so the code can be publicly visible.

### Mapbox

```jsx:src/components/Map/map.js
import ReactMapGL from "react-map-gl";

<ReactMapGL
  {...this.state.viewport}
  onViewportChange={(viewport) => this.setState({ viewport })}
>
  <Source type="geojson" data={this.getValues()}>
    <Layer {...mapAreaLayer} />
  </Source>
</ReactMapGL>;
```

`react-map-gl` is a react wrapper for mapbox-gl that makes it really easy to call functions for game logic and getting users geolocation data and injecting that into the map. This library is the main component for the gameplay.

### State Management

```js:store.js
import { createStore, applyMiddleware } from 'redux'
import { DashboardState } from './constants';

const initialState = {
    // state variables
    dashboardState: DashboardState.home,
    ...
}

const setGlobalLeaderboardList = (state, action) => ({
    // redux function to update state
    ...state,
    globalLeaderboardList: action.users
});

const reducer = (state = { initialState, input: {} }, action) => {
    switch (action.type) {
        // update global state
        case 'dashboardHome':
            return {
                ...state,
                dashboardState: DashboardState.home
            }
    }
}

const composeEnhancers = composeWithDevTools({trace: true})
export const initializeStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware())
    )
}
```

Redux is incredibly powerful and great for managing state in larger applications. Redux is used to manage signed-in users, screen state, gameplay stats, etc. Above is a sample Store.js file detailing how states are saved using Redux.

## 05 - Release & Feedback

### Deployment

The portfolio demo is deployed with [Vercel](https://vercel.com/). Updates to the `master` branch trigger a production deployment.

## Summary

I learned a lot about application development during this project. Going from an idea to a deployed project in a short period of time was a practical lesson in agile development. Integrating tools and frameworks into a complex application can be difficult, but finding workable solutions is rewarding. The hosted build should be treated as a portfolio demo rather than an actively supported product.
