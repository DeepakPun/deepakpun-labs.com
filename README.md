# Deepak's MCU Multiverse Labs

Welcome to **deepakpun-labs.com**, a microservices platform built to house my ultimate theories, predictions, and deep-dives into the Marvel Cinematic Universe (MCU).

This project is an enterprise-grade portfolio designed to showcase modern DevOps, Infrastructure as Code (IaC), container orchestration, and multi-language microservices.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React Framework)
- **Backend:** Node.js + Express (Core API)
- **Database:** MongoDB
- **Containerization:** Docker & Docker Compose
- **Future Scale:** Django + Flask services

---

## 🚀 Local Development Setup

Ensure you have [Docker Desktop](https://docker.com) installed on your machine.

### 1. Clone & Initialize

```bash
git clone https://github.com
cd deepakpun-labs
```

### 2. Start the Stack

Spin up the Next.js frontend, Express backend, and MongoDB database with a single command:

```bash
docker-compose up --build
```

### 3. Ports & URLs

Once the containers are running, you can access the services locally:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **MongoDB:** `mongodb://localhost:27017`

### 4. Seed Sample Theory Data

To populate the app with the initial **Avengers: Doomsday** theory, trigger the seed endpoint:

```bash
curl -X POST http://localhost:5000/api/theories/seed
```

Refresh your browser at `http://localhost:3000` to see the updated data.

---

## 🌐 Deployment Roadmap

1. **Phase 1: Local Development** (Current) - Multi-container setup via Docker Compose.
2. **Phase 2: AWS Enterprise Sandbox** - Deployment using enterprise-grade DevOps tools (CI/CD, IaC, Cloud Orchestration), followed by an environmental teardown.
3. **Phase 3: Permanent Production** - Cost-efficient, automated CI/CD deployment to a DigitalOcean Droplet using GitHub Actions and Docker Hub.
