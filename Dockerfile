
# 1. Base Image
FROM node:18-alpine AS base

# 2. Build Stage
FROM base AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 3. Production Stage
FROM base AS production
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

# Expose the port the app runs on
EXPOSE 9002

# Command to run the app
CMD ["npm", "start"]
