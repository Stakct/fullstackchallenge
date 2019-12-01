# FullStackChallenge

[![GuardRails badge](https://badges.guardrails.io/Stakct/fullstackchallenge.svg?token=2ee22bf7766e7acea2f99f851eb6890745d759e3ef4913c85c5b78fb0ff848b9&provider=github)](https://dashboard.guardrails.io/default/gh/Stakct/fullstackchallenge)

FullStack Challenge, this is project proves the skills of a full stack developer. This includes a DevOps part, creating a docker-compose file to easily start the backend and frontend services.
The backend exercise requires creating a simple REST API using Node.JS and a framework (ExpressJS in this implementation).
The frontend exercise requires creating a simple app using ReactJS which is a dashboard to display and insert Scan Results.

## Getting Started

To start the project just run `docker-compose up`

The web app is reachable using the address `http://127.0.0.1:3001`, the API is reachable using the address `http://127.0.0.1:3000`, you can also use the port 35432 to connect your Postgres client.

### Prerequisites

To run this project you need *Docker Engine* installed in your machine.

If you are using OSX to run this project please pay attention.
By default, you can share files with your docker containers in /Users/, /Volumes/, /private/, and /tmp directly. If you have cloned this project into a different folder, use the File sharing tab in Docker preferences.

**Whale menu -> Preferences -> File sharing.**

## Built With

* [Express.JS](https://expressjs.com/it/) - The api Node.JS framework used
* [React](https://it.reactjs.org/) - The web framework

## FrontEnd notes

The guidelines required a 3 screens dashboard where one screen should be used to add a Scan Report. I have decided to move the screen into a modal, so we have the dashboard main content to read data about the scan reports and the navbar with the actions.
Moment.js was used to format dates, in fact, the timestamp in the Scan Report list was displayed formatted.

## Authors

* **Salvatore Tarda**

## License

This project is licensed under the GNU License v3