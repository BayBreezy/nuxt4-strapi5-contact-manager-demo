# Nuxt 4 + STrapi 5 - Mini Contact Manager

This project is a simple Contact Manager application built using Nuxt 4 for the frontend and Strapi 5 as a headless CMS for managing the contacts. The app allows you to create, read, update, and delete (CRUD) contacts with a clean and intuitive interface.

## Youtube Video

![Cover](/contact-manager-image.PNG)

A video to the project can be found [here](https://youtu.be/u-4yOmgdrlg)

## Features

- Create, Read, Update (CRU) contacts
- Backend powered by Strapi 5
- Frontend powered by Nuxt 4
- REST API integration
- Simple and responsive UI by [UI Thing](https://ui-thing.behonbaker.com/getting-started/introduction)

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

## Backend Setup (Strapi 5)

- Clone the repository and navigate to the backend folder:

```bash
git clone <repo_url>
cd backend
```

- Install dependencies and run Strapi:

```bash
npm install
npm run dev
```

- Copy the `.env.example` file to `.env` and update the environment variables:

```bash
cp .env.example .env
```

## Frontend Setup (Nuxt 4)

- Navigate to the frontend folder:

```bash
cd frontend
```

- Copy the `.env.example` file to `.env` and update the environment variables:

```bash
cp .env.example .env
```

- Install dependencies and run the Nuxt app:

```bash
npm install && npm run dev
```

- Open your browser and navigate to `http://localhost:3000` to view the app.

## License

This project is licensed under the MIT License.
