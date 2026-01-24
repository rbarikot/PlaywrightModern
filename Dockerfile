# Use the correct Playwright version matching your installation
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Create test result directories
RUN mkdir -p testResult/smartreport testResult/htmlreport

# Set environment variable for CI
ENV CI=true

# Default command to run tests
CMD ["npx", "playwright", "test"]