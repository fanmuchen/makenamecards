#!/bin/bash

# Load environment variables from .env file
set -a
source .env
set +a

# Update specific dependency to the latest version
echo "Updating fmcnav to the latest version..."
npm install fmcnav@latest

# Check if the update was successful
if [ $? -ne 0 ]; then
  echo "Dependency update failed. Exiting..."
  exit 1
fi


# Clean local build directory before building
echo "Cleaning local build directory..."
rm -rf build

# Set PUBLIC_URL for the build process
echo "Setting the base URL for the project..."
export PUBLIC_URL=$BASE_URL

# Build the project with react-scripts
echo "Building the project with react-scripts..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting..."
  exit 1
fi

# Clean remote directory before uploading
echo "Cleaning remote directory..."
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_HOST "rm -rf $REMOTE_DIR/*"

# Check if remote directory clean was successful
if [ $? -ne 0 ]; then
  echo "Remote directory clean failed. Exiting..."
  exit 1
fi

# Transfer build files to remote server
echo "Transferring files to remote server..."
scp -i $SSH_KEY_PATH -r build/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Check if transfer was successful
if [ $? -ne 0 ]; then
  echo "File transfer failed. Exiting..."
  exit 1
fi

echo "Deployment successful!"