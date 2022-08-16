# Django-React-Heroku template first setup guide

A - Environement setup

Upon downloading of this template the first step is to ensure the correct environment is set up.

    A.1 - Django environement setup

It is highly recommended to use this app in a virtual environement to ensure a proper python dependency management :

=>Go in the main app directory and run the command :
    $ pip3 install pipenv       (if not already installed)
    $ pipenv shell

=>Then all the packages the project needs to work have to be installed. The list of theses packages resides in the requirement.txt file (or Pifile see note). To install all packages from the requirement.txt file use the command :
    $ pipenv install -r ./requirements.txt
  This requirement.txt will be used by Heroku to know which dependencies to install to run your python app.

# ///
Note 1 : 
If you wish to install new Django dependencies this requirement.txt file will NOT update itself automatically to update it use the following command :
    $ pip freeze > requirement.txt

Note 2 : 
In the root folder of this template there are two files named Pipfile and Pipfile.lock. The standard Pipfile serves roughly the same purpose as the requirement.txt file for heroku. However the pipfile WILL take precedence so keep it up to date aswell. To update it copy the list of dependencies from the requirement.txt and paste it in the packages section of the pipfile. You must change the format of packages name :
    packages names in requirement.txt : Django==4.0.6
    packages names in pipfile : Django="4.0.6"
To generate the Pipfile.lock that will be used by heroku use the following command :
    $ pipenv update

Note 3 : 
The requirement.txt and Pipfile.lock serves roughly the same purpose (for heroku) but the use of Pipfile.lock is considered a better practice.
# ///

    A.2 - Javascript environement setup

All javascript dependencies are listed in the package.json file.

=>To install all javascript dependencies, navigate to the main directory and run the command :
    $ npn install
  This command will install all dependencies listed in the package.json file

# ///
Note : the package.json update itself automatically when new dependencies are installed. 
# ///

B - Launching the developpement environement

Both Django and React have their own develpmentevironement that need to be launched in order tu run the code.

    B.1 - Django

To launch the Django web server be sure to have the virtual environment up and running then naviguate in the main directory and use the command :
    $ python3 manage.py runserver
This command will launch the python server that will be avaiblable at the following address (local) :
    127.0.0.1:8000
In this template Django is configured to serve the API via the /api route. It's also configured to serve the React app on the root address however this features requires to generate a live build. Without a live build the root adress (127.0.0.1:8000) leads to nothing. Heroku take care of all the live build creation. However if you want to generate a live build manually, refer to the "manual live build" section of this document.

    B.2 - React

To launch the react devlopment environment simply use the following command in the main directory :
    npm start
The React development environement has it's own webserver accessible via the adress :
    localhost:3000
In this template Django is configured to serve the React app on its root address however this require  a live build. While on a development build use the localhost address.

# Manual live build

 Generating a manual live build is quite straight forward :
    => The first step requires to naviguate with the console in the main directory and run the command :
    $ npm run build
    This command will bundle all the react code into static files and store them into a "build" folder in the root  directory.
    => The second command generates static files used by the python side of the app. Make sure to be in a virtual environment AND in the root folder when you use this :
    $ python3 manage.py collectstatic
    This will generate a staticfiles folder a the root of the app. At this point the Django server will serve the React app on its root address (/).

# Steps to deploy the app on Heroku

A. Heroku preparation

    The first step to deploy the app on heroku is to install the heroku CLI. This step is described on Heroku's website :
        https://devcenter.heroku.com/articles/heroku-cli

    A.1 Creating the Heroku repository and preping it

        => Go on the Heroku dashboard (https://dashboard.heroku.com/apps) and create a new app
        => Go in the app management page and go in the settings tab.
        => In the config var tab add the content of the .env file.
        => In the buildpacks section add the node.js buildpack !!THEN!! the python buildpack (node.js buildpack has to run before the python buildpack because the later need the react production build to run properly)

B. App preparation

    This template has been created to avoid having to do many app reparation. The main thing to do is to add the heroku app address (obtainable on the app page on heroku) to the 'allowed hosts' list in the file settings.py. The address has to be added without the http://.

C. Uploading the app

    Once Heroku and the app have been preped, time to deploy the app!

    => In the app connsole run the following command to connect to heroku :
        $ heroku login
    => Then you have to link the online repository to your project (like a git repo). Do it with the command :
        $ heroku git:remote -a name_of_the_app
    => Then proceed like a git upload :
        $ git add .
        $ git commit -m "your_message"
        $ git push heroku master

    The uploading script will run and the app will be deployed!!




# STANDARD REACT README //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
