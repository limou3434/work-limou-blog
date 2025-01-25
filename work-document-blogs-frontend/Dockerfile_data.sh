#!/bin/bash
docker cp ./docs/.vuepress/dist work-document-blogs-frontend:/usr/share/nginx/html
docker restart work-document-blogs-frontend