# System Architecture Matrix Welcome to the internal engineering logs for `deepakpun-labs.com`. This entire blueprint is containerized and managed via decoupled microservices.

## Microservices Blueprint

- `client` (Port 3000): Next.js/Tailwind MCU Theory Vault
- `core-api` (Port 3001): Node.js/Express Database Controller
- `docs` (Port 3002): Pure React + Vite System Docs

## Local Cold Boot Command

To spin up the ecosystem locally with volumes active, use the script wrapper:

```bash
./run.sh dev
```
