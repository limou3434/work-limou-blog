#!/bin/bash
docker container stop work-document-blogs-frontend ||
  docker container rm work-document-blogs-frontend ||
  docker run -d -p 8080:80 --name work-document-blogs-frontend work-document-blogs-frontend:1.0.0 &&
  docker container logs work-document-blogs-frontend &&
  docker container ls -a
