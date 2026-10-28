# 📓 DevSecOps & Advanced Tooling Sandbox Journal

This repository tracks my journey of layering developer utilities, automated security pipelines, Infrastructure as Code, and observability tools directly onto my existing, containerized microservices application.

### 🚀 Project Baseline (Already Implemented)

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Node.js / Express microservices
- **Database:** MongoDB
- **Environment:** Multi-container Docker Compose
- **CI/CD:** GitHub Actions deploying live to a DigitalOcean Droplet

---

## 🗓️ Day 01: Secret Scanning & Static Analysis (SAST)

- **Branch:** `day-01/sast-security`
- **Goal:** Automate code flaw detection and catch leaked credentials (like Mongo URIs, JWT secrets, or DO tokens) before they are pushed.
- **What I Did:**
  - [x] Integrated GitHub CodeQL or SonarQube into the existing GitHub Actions workflow.
  - [x] Added a GitGuardian or Trufflehog scanning step to block commits with hardcoded secrets.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_
- **How to verify this branch:**
  ```bash
  git checkout day-01/sast-security
  # Push a branch with a mock secret to verify the pipeline fails cleanly
  ```

---

## 🗓️ Day 02: Software Composition Analysis & Container Scanning (Trivy)

- **Branch:** `day-02/trivy-container-scan`
- **Goal:** Scan open-source npm dependencies and base Docker OS images for CVEs right after building, but _before_ deploying to the Droplet.
- **What I Did:**
  - [ ] Injected an `aquasecurity/trivy-action` step into the GitHub Actions deployment workflow.
  - [ ] Configured the pipeline to halt deployment if `CRITICAL` infrastructure vulnerabilities are detected.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_

---

## 🗓️ Day 03: Infrastructure as Code (Terraform for DigitalOcean)

- **Branch:** `day-03/terraform-do`
- **Goal:** Move away from manual DigitalOcean dashboard management by defining the target Droplet, VPC, and firewalls purely in code.
- **What I Did:**
  - [ ] Initialized a root-level `/infra` directory containing Terraform manifests.
  - [ ] Written HCL scripts utilizing the `digitalocean` provider to safely provision a duplicate test environment.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_
- **Commands to Test This Branch:**
  ```bash
  git checkout day-03/terraform-do
  cd infra
  terraform init && terraform plan
  ```

---

## 🗓️ Day 04: Infrastructure Security & Linting (Checkov / tfsec)

- **Branch:** `day-04/iac-security`
- **Goal:** Audit Terraform files automatically to catch structural misconfigurations (e.g., broad firewalls leaving database ports open to `0.0.0.0/0`).
- **What I Did:**
  - [ ] Added a Checkov or tfsec linting gate to the CI pipeline ahead of any cloud updates.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_

---

## 🗓️ Day 05: Real-Time Communication (WebSockets)

- **Branch:** `day-05/websockets`
- **Goal:** Implement live, bi-directional event updates using `socket.io` without breaking the stable Express REST routing layout.
- **What I Did:**
  - [ ] Spun up a parallel WebSocket engine alongside existing HTTP listeners.
  - [ ] Configured Next.js frontend state to react instantly to server-emitted events.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_

---

## 🗓️ Day 06: Asynchronous Message Queue (RabbitMQ)

- **Branch:** `day-06/rabbitmq-message-queue`
- **Goal:** Introduce decoupled, asynchronous communication between microservices by replacing heavy, blocking HTTP calls with a reliable message broker.
- **What I Did:**
  - [ ] Added an official `rabbitmq:management` image to the local `docker-compose.yml` config.
  - [ ] Written producer and consumer logic using `amqplib` to securely handle long-running background tasks.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_

---

## 🗓️ Day 07: Centralized Structured Logging (Winston + Grafana Loki)

- **Branch:** `day-06/centralized-logging`
- **Goal:** Standardize application telemetry with JSON logging and eliminate the need to SSH into the Droplet to run `docker compose logs`.
- **What I Did:**
  - [ ] Swapped native `console.log` statements for structured Winston/Pino logging engines.
  - [ ] Added a log-gathering container to ship container stdout streams to a centralized viewing pane.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_

---

## 🗓️ Day 08: Metrics & Application Observability (Prometheus & Grafana)

- **Branch:** `day-07/observability`
- **Goal:** Monitor microservices health metrics (CPU utilization, HTTP error spikes, latency) through graphical dashboards.
- **What I Did:**
  - [ ] Exposed an internal `/metrics` endpoint using `prom-client` in the Express services.
  - [ ] Provisioned Prometheus and Grafana containers locally via Docker Compose to build monitoring panels.
- **Blockers & Fixes:**
  - _Blocker:_
  - _Fix:_
