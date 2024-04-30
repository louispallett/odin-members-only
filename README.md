# odin-members-only

#### _Course of [The Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only/project_submissions?direction=desc&sort=likes_count)_


![Screenshot from the live website, showing a sign-up page with a form and a sign-up button](https://res.cloudinary.com/divlee1zx/image/upload/v1714507749/Screenshot_from_2024-04-30_21-08-20_devbap.png)

### [Live link to the page](https://cooing-truth-impala.glitch.me/) 
Hosted by Glitch

_Members Only_ is a small NodeJS site where users sign up and login to a dashboard. Once signed up, they can post messages to the dashboard, but only members can see who wrote each message and when it was posted. 

To become a member, users can click on 'Become member' and enter the password:

```
TheOdinProject
```

This application uses express-session to create a session once the page is visited and updates as the user logs in (allowing the user, if authenticated, to return to the root path and be redirected immediately to the dashboard).

It also uses PassportJS (local strategy) and bcrypt to hash passwords.

This is part of The Odin Project's NodeJS course. The lesson for which can be found [here](https://www.theodinproject.com/lessons/nodejs-inventory-application). The Odin Project gives very basic prompts for what the site should do, but the code written here is my own (although I did do a lot of searching to implement certain things) - the bottom line is that I did not follow a single tutorial on how to make this.

## Features

- Create an account and post messages to the dashboard.
- Become a member and see who posted each message and when.
- Become an administrator and delete messages (if you would like to see how this is done, please contact me and I can share the administrator password with you).

## Tech

This site relies on a number of products. A full list of dependencies can be found on the package.json file. Some of the most prevalent are:

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used to hash and salt passwords
- [Express](https://github.com/expressjs/express/tree/master) - fast node.js network app framework. Additionally, the following express packages are used:
    - [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Handles exceptions for express routes
    - [express-session](https://www.npmjs.com/package/express-session) - Setting sessions and cookies to browsers.
    - [express-validator](https://www.npmjs.com/package/express-validator) - A set of middlewares to validate and sanitize requests.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database to store the backend data. Also:
    - [connect-mongo](https://www.npmjs.com/package/connect-mongo) - a MongoDB session store to create sessions and set an expiration.
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for NodeJS.
- [PassportJS](https://www.passportjs.org/) - Authentication middleware for NodeJS. This application uses the 'Local' strategy.
- [tailwindcss](https://tailwindcss.com/) - An extremely popular CSS framework.

## Acknowledgements

All content used has been free-of-use for non-commercial uses. A full list of acknowledments is below:

| Asset | Source |
| ------ | ------ |
| Roboto.woff/woff2 | Roboto by Christian Robertson, Google Fonts |
| title-font.woff/woff2 | Jersey 10 by Sarah Cadigan-Fried, Google Fonts |
| close.svg | Cross SVG Vector, by Konstantin Filatov, SVG Repo |
| github.svg | Github 142 SVG Vector by bypeople, SVG Repo |
| key.svg | Key SVG Vector by SVG Repo, SVG Repo |
| message.svg | Message Circle Chat SVG Vector by Dazzle UI, SVG Repo |
| profile.svg | Profile 1336 SVG Vector, by bypeople, SVG Repo |

## Running Locally

You are welcome to run the application locally, although you will need to set up your own MongoDB database to do this. Fork and clone (or simply download) the repository and download all the dependant packages:

```sh
npm install
```

Next, you'll need to set up your MongoDB database and get your driver connection string. Create a ```.env``` file and set the following variables below - you can set whatever strings you want for these:

```env
ADMIN_PASS=
MEMBER_PASS=
SECRET=
```

Finally, add your MongoDB connection string:

```env
MONGODB_URI=mongodb_connection_string
```

**Note**: Ensure that your ```.env``` file is included on your ```.gitignore``` file if you intend to push anything publically.

Now, before you run server, you'll need to configure Tailwind - you can run the following command which will build your ```style.css``` file in ```public/stylesheets/```:

```sh
npm run build:tailwind
```

This will watch for any changes in relevant files which means the ```style.css``` file needs to be re-built. Now, you can run:

```sh
npm run serverstart
```

You can then go to ```http://localhost:3000/``` and the site should be running. If you want to see feedback on your terminal about users and sessions, you can insert the following lines of code in the ```app.js``` file:

```js
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

/* Make sure to insert the code above these lines:
app.use('/', indexRouter);
app.use("/users", usersRouter); */
```