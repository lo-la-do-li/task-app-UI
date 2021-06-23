# Task App: _a full-stack solo project_

### By: [Lola Dolinsky](https://github.com/lo-la-do-li)

This progressive web application was created as a solo project to implement newly learned skills in backend development. It features JWT authentication, image upload, server-side sorting and pagination, and a fully-responsive UI. 

- Link to [Task App By Lola](https://www.task-app-by-lola.com/)
- Link to [Task App Backend Repo](https://github.com/lo-la-do-li/task-manager-api)

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies And Tools](#technologies-and-tools)
- [Roadmap](#roadmap)
- [Contributor](#contributor)

## Project Overview

Task App allows users to create an account, log in, and add/remove/update/delete tasks in their to-do list. Additionally, users can edit their profile information by uploading an image for an avatar or modifying name, email, and password. 


## Technologies And Tools

> - React (w/ hooks)
> - React Router
> - JavaScript
> - JSX
> - Material-UI
> - Engineered Server with:
>   - Node
>   - Express
>   - MongoDB
>   - Mongoose
>   - Authentication via JSON Web Token 
>   - Sendgrid email service (on account creation/deletion)
>   - Multer middleware (for image upload)
> - Deployment
>   - AWS Amplify (Front End)
>   - Heroku (Backend Server)


## Task App in Action:

#### Mobile Login:

![Mobile Login]()

#### Add and Complete Tasks:

![Add/Complete Tasks](https://media.giphy.com/media/vzs3vR8J03OFyplXW0/giphy.gif)

#### User Profile Expanded:

![User Profile Expanded]()

#### Mobile Responsive (mobile view):

![Mobile Responsive](https://user-images.githubusercontent.com/68264128/106074195-a3a29900-60c8-11eb-8e4b-8bd9cab75fa0.png)


<details>
  <summary>Setup</summary>

- _Click_ the **Fork** button on the top right-hand corner of this page
- Clone the repository down and cd into the repo on your local machine by running:
  - `git clone git@github.com:lo-la-do-li/task-app-UI.git`
  - cd into `task-app-ui` locally
- Install the library dependencies by running:
  - `npm install`
- To verify that it is setup correctly, run `npm start` in your terminal.
- Go to `http://localhost:3000/` and you should see the site.
- Enter `control + c` in your terminal to stop the server at any time.
- `npm run build` to build the project if you make any changes and want to make a production build
- `npm start-sw` to create a production build with cacheing and add to mobile device homepage
</details>

## Roadmap

With more time, I would like to:

- Refactor some ui components to be reuseable 
- Modify file size limit to fit selfie upload for avatar on mobile device

## Contributor

<img src="https://media-exp1.licdn.com/dms/image/C4E03AQG9jZTOd0oUCQ/profile-displayphoto-shrink_800_800/0/1606070086923?e=1616025600&v=beta&t=WldtPrGc57mSEiAJkFaYGVq9Ksc0uqBmFLFR11fQUs4" alt="Lola Dolinsky"
 width="150" height="auto" />

- [Lola Dolinsky](https://github.com/lo-la-do-li)
