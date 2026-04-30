FROM node:20-alpine
WORKDIR /usr/src/app

# Copy backend dependencies and install
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# Copy backend source
COPY backend/ ./backend/

# Copy frontend data that the backend depends on
COPY frontend/src/data/ ./frontend/src/data/

EXPOSE 8080
WORKDIR /usr/src/app/backend
CMD [ "node", "server.js" ]
