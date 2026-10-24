# SyncSpace
## Real-Time Collaborative Workspace for Developers

SyncSpace is a full-stack collaboration platform designed to bring developers together in a shared workspace. It combines collaborative code editing, an interactive whiteboard, workspace-based file management, and persistent storage to support collaborative development and technical discussions.

**Repository:** [rishPhoneix/SyncSpace_Workflow](https://github.com/rishPhoneix/SyncSpace_Workflow)

**Project status:** Active development

## Overview

Developers often need to switch between separate tools to discuss an implementation, sketch an architecture, edit code, and share changes. SyncSpace aims to bring these activities into one collaborative environment.

The application uses a React-based frontend and a Node.js/Express backend, with MongoDB for persistence and Yjs-based synchronization for collaborative editing.

## Key Features

- **Authentication:** User registration and login with protected application access.
- **Workspaces:** Organize collaborative work within workspace-specific environments.
- **Real-time code editing:** Monaco Editor integrated with Yjs for concurrent editing.
- **Collaborative whiteboard:** Draw and update visual elements in a shared workspace.
- **File management:** Create, open, edit, and manage workspace files.
- **Persistent file storage:** Save file content through backend REST APIs and MongoDB.
- **Collaborative document persistence:** Store and restore Yjs document state through the backend.
- **Code execution and preview:** Frontend tooling for supported code execution and HTML preview workflows.

Feature availability can depend on the current implementation and environment configuration. See the project review document for verified test results and remaining work.

## Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| Frontend | React, Vite | User interface and development workflow |
| Styling | Tailwind CSS | UI styling |
| Code editor | Monaco Editor | In-browser code editing |
| Real-time synchronization | Yjs, y-socket.io, y-monaco | Shared document state and collaborative editing |
| Whiteboard | React, Konva | Interactive drawing interface |
| Backend | Node.js, Express | REST APIs and application services |
| Real-time transport | Socket.IO | Client-server communication |
| Database | MongoDB, Mongoose | Persistent application data |
| Authentication | JWT-based authentication | Authenticated application access |

## Architecture

SyncSpace separates the frontend, backend services, and persistent storage.

```text
┌────────────────────────────────────┐
│       React + Vite Frontend        │
│                                    │
│  Workspace UI   Monaco Editor      │
│  File Explorer  Collaborative Board│
└───────────────┬────────────────────┘
                │
       REST API │ Socket.IO / Yjs
                │
┌───────────────▼────────────────────┐
│       Node.js + Express Backend    │
│                                    │
│  Authentication  Workspace APIs   │
│  File APIs        Yjs Sync Service │
└───────────────┬────────────────────┘
                │
┌───────────────▼────────────────────┐
│              MongoDB               │
│                                    │
│  Users  Workspaces  Workspace Files│
│  Persisted Collaborative Documents │
└────────────────────────────────────┘
```

The REST API manages application and file operations. Yjs maintains shared document state across connected collaborators, while the backend's persistence mechanism stores collaborative document updates for recovery.

## Repository Structure

```text
SyncSpace_Workflow/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   └── server/
│       ├── server.js
│       ├── models/
│       └── routes/
├── docs/
│   └── PROJECT_REVIEW.md
├── README.md
└── .gitignore
```

This is the intended high-level structure. Consult the repository for the exact current source-file layout.

## Prerequisites

- Node.js and npm compatible with the project dependencies
- MongoDB Atlas or another configured MongoDB deployment
- Git
- A modern web browser

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rishPhoneix/SyncSpace_Workflow.git
cd SyncSpace_Workflow
```

### 2. Configure the backend

```bash
cd backend/server
npm install
```

Configure the backend environment variables using the project's existing environment-variable names. At minimum, configure the MongoDB connection string, authentication secret, and any required application settings.

Create a local `.env` file from the project's documented configuration if an example file is provided. Never commit credentials or production secrets.

Start the backend using the available script in `package.json`. For example, if the project defines a `dev` script:

```bash
npm run dev
```

Otherwise, use the startup command specified by the backend package scripts.

### 3. Configure the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite in your terminal. The default is commonly `http://localhost:5173`, but use the URL actually displayed.

Configure the frontend's API and Socket.IO endpoints using the environment-variable names supported by the current source code. For local development, ensure that they point to the running backend.

### 4. Create an optimized production build

From the `frontend` directory:

```bash
npm run build
```

To preview the generated production build locally, if supported by the frontend scripts:

```bash
npm run preview
```

## Verification

The following behaviors have been manually tested in the current development environment:

- Login and workspace access.
- Real-time code synchronization between two browser sessions.
- File content persistence after saving and refreshing.
- Collaborative document recovery after a backend restart.
- Isolation of content between different files and workspaces.
- Whiteboard synchronization between browser sessions.

The frontend production build also completed successfully using Vite 8.3.5 after dependency remediation.

These results describe local development testing. They do not constitute a formal security audit, load test, or production deployment certification.

## Security and Deployment Considerations

Before exposing the application publicly:

- Enforce authentication and workspace-membership authorization for REST and collaborative socket connections.
- Validate access to every Yjs document room on the server.
- Restrict CORS and allowed origins to the intended deployment domains.
- Keep secrets in environment variables or a suitable secrets manager.
- Review code-execution isolation before allowing untrusted users to run code.
- Test concurrent editing, reconnect behavior, and document restoration under failure conditions.
- Review the production bundle size and consider lazy-loading heavy editor components.
- Run dependency audits and regression tests before releases.

## Project Documentation

See [`docs/PROJECT_REVIEW.md`](docs/PROJECT_REVIEW.md) for the project scope, architecture summary, verification results, risks, and recommended engineering priorities.

## Contributing and Review

This repository is maintained as the personal project repository for review and development. Changes should be tested before being merged into the main branch. Avoid committing local environment files, credentials, generated dependencies, and build artifacts.

## License

No license has been specified in this document. Confirm the intended licensing terms before distributing or reusing this project.
