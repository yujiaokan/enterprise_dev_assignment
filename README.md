# Getting Started with App

This project is developing a web app named electric car home charger share. The project's goal is to explore the electric car field and connect with individuals interested in offering home electric car charging services. This will assist drivers in need of charging options. The app, bootstrapped with a MongoDB back-end server, enables users to register their home chargers, update details after registration, view available home chargers on a map, delete a home charger if they no longer wish to share, and search for home chargers by area or address. It also keeps a record of saved home chargers in the user profile.

The main screen features a map that lists all home chargers. Clicking on a marker will reveal details about the charger, with options to edit, delete, or save the charger.

The 'search home chargers' and 'add home charger' options are located in the header at the top of the page. The search page displays a list of all available home chargers by area and address. To add or update home charger details, users must fill out all fields in the form. This information is then posted and updated in the MongoDB database.

The deletion screen prompts users to enter a charger ID and confirm the removal of a home charger. Once confirmed, the charger is successfully deleted from the back-end server.

I have deployed my server on Render, which encrypts HTTP to HTTPS to secure my data as it passes through the network. This is especially important for protecting sensitive information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
