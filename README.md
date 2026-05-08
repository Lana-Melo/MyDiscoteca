# MyDiscoteca

## Team

| Name | N. |
|------|--------|
| Francisco Fernandes | 60712 |
| João Rodrigues | 61789 |
| Lana Santos | 61877 |
| Matheus Cruz | 60712 |

---

## Overview

**MyDiscoteca** is a web application developed for the **PSI (Projecto de Sistemas de Informação)** course at [Faculdade de Ciências da Universidade de Lisboa](https://ciencias.ulisboa.pt/). The project follows a Scrum-based development process, split into three two-week sprints. This repository covers **Sprint 1** and **Sprint 2**.

---

## Context

MyDiscoteca targets physical music album collectors. It allows users to:

- **Organise their collection** of physical albums (CDs, vinyl records, and cassettes)
- **Browse and search** artists and albums, with detailed information pulled from structured data
- **Manage album versions** — the same album may exist in multiple versions of the same physical formats, each identified by a unique **EAN-13 barcode**
- **Maintain personalised lists** of albums
- **Submit requests** for new album versions to be added to the app's catalogue

Albums are identified by their **MBID** (MusicBrainz Identifier), artists by their **ISNI** (International Standard Name Identifier), and songs by their **ISRC** (International Standard Recording Code). An artist can be a solo artist or a group, and a group's members are also artists.

---

## Features

### Sprint 1 — v1

| # | User Story | Description |
|---|-----------|-------------|
| US1 | Register | Create a user account with username, email, password and date of birth. Includes validation (age ≥ 13, password strength, unique username/email). |
| US2 | Login | Authenticate with username and password. |
| US3 | View Profile | See username, email, date of birth and favourite artist. |
| US4 | Edit Profile | Update username, email, password and date of birth (requires current password confirmation). |
| US5 | Search Artists | Search artists by partial name match. |
| US6 | Artist Page | View artist details (ISNI, name, activity start year) and their albums ordered by release year. |
| US7 | Favourite Artist | Add or remove an artist as favourite directly from their page. |

### Sprint 2 — v2

| # | User Story | Description |
|---|-----------|-------------|
| US8 | Search Albums | Search albums by partial title match, using the same search bar as artists (with a dropdown to switch between them). |
| US9 | Album Page | View album details: cover image, MBID, title, release year, type (Single/EP/LP), artist, track list (number, title, duration) and available versions (EAN-13, format, edition label). |
| US10 | Add to Collection | Add any version of an album to the user's collection directly from the album page. |
| US11 | View Collection | Browse the full collection with sorting by any field (title, release year, artist, format, edition, EAN-13, date added). Remove items from the collection. |
| US12 | Request New Version | Submit a request for a new album version (EAN-13, physical format, edition label). |
| US13 | View Requests | List all submitted version requests with their status (pending, accepted, rejected), filterable by status. |
| US14 | Request Notifications | Receive notifications when a request is accepted or rejected, accessible from the dashboard. |

---

## Technical Information

### Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 19 |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Containerisation | Docker + Docker Compose |
| UI Component Library | [Porsche Design System (PDS)](https://designsystem.porsche.com/) |

### Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Domain Model

[`domain-model.png`](domain-model.png)

### Database Structure Diagram

The entity-relationship diagram of the MongoDB collections is available at [`mydiscotecadb.png`](./mydiscotecadb.png).

### Project Structure

```
PSI-Project/
├── backend/
│   ├── controllers/        # Request handlers (album, artist, auth, user)
│   ├── models/             # Mongoose schemas (album, artist, song, track, version, physicalSupport, user)
│   ├── routes/             # Express route definitions
│   ├── public/media/       # Served album cover images
│   ├── seed.js             # Database seed script
│   └── server.js           # App entry point
├── frontend/
│   └── MyDiscoteca/
│       └── src/app/
│           ├── album/      # Album card component + album details page
│           ├── artist/     # Artist card component + artist details + artist albums pages
│           ├── dashboard/  # Dashboard page
│           ├── search/     # Combined artist & album search component
│           ├── user/       # Login, register, profile, edit profile pages + password modal
│           ├── models/     # TypeScript interfaces (album, artist, user)
│           └── services/   # HTTP services (album, artist, user)
├── docker-compose.yml
```

---

## How to Use

### Running the Application

```bash
# Build and start all services (attached mode)
docker-compose up --build

# Build and start in background
docker-compose up -d --build

# Stop all services
docker-compose down
```

### URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost |
| Login page | http://localhost/login |
| Backend API | http://localhost:3001 |

### Querying the Database with MongoDB Compass

1. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Open Compass and connect using:
   - **Host**: `localhost`
   - **Port**: `27017`
   - No authentication required
3. Select the `mydiscotecadb` database to browse collections: `artists`, `albums`, `songs`, `tracks`, `versions`, `users`, etc.

> **Note:** The backend also exposes a seed route. If the database is empty on first run, it is seeded automatically via `seed.js`.

The `DROP_DB` flag in [`backend/.env`](./backend/.env) controls seeding behaviour:

| Value | Behaviour |
|-------|-----------|
| `true` | Drops and re-seeds the database on startup |
| any other value | Performs an upsert (adds missing data without wiping existing records) |
