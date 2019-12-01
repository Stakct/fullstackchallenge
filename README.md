# FullStackChallenge

[![GuardRails badge](https://badges.guardrails.io/Stakct/fullstackchallenge.svg?token=2ee22bf7766e7acea2f99f851eb6890745d759e3ef4913c85c5b78fb0ff848b9&provider=github)](https://dashboard.guardrails.io/default/gh/Stakct/fullstackchallenge)

FullStack Challenge, this is project proves the skills of a full stack developer. This includes a DevOps part, creating a docker-compose file to easily start the backend and frontend services.
The backend exercise requires creating a simple REST API using Node.JS and a framework (ExpressJS in this implementation).
The frontend exercise requires creating a simple app using ReactJS which is a dashboard to display and insert Scan Results.

## Getting Started

To start the project just run `docker-compose up`

### Prerequisites

To run this project you need *Docker Engine* installed in your machine

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