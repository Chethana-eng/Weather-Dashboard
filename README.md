WEATHER APP
















Q2 — Maven Build
mvn clean package
dir target
java -jar target\demoapp-0.0.1-SNAPSHOT.jar   # optional run

Q3 — Git & GitHub
git init
git config --global user.name "YourName"
git config --global user.email "you@example.com"
git add .
git commit -m "Initial commit - demoapp"

git checkout -b feature/add-endpoint
# add TimeController.java file
git add src/main/java/com/example/demoapp/TimeController.java
git commit -m "Add /time endpoint"

git checkout master
git merge feature/add-endpoint
git branch -M main

git remote add origin https://github.com/<username>/demoapp-lab-practice.git
git push -u origin main

Q4 — Docker

Dockerfile

FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


Commands

docker build -t demoapp:v1 .
docker images
docker run -d -p 8080:8080 --name demoapp demoapp:v1
docker ps

docker login
docker tag demoapp:v1 <dockerhub-username>/demoapp:v1
docker push <dockerhub-username>/demoapp:v1

Q5 — Docker Compose

docker-compose.yml

version: '3.8'
services:
  web:
    image: <dockerhub-username>/demoapp:v1
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/demo
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: rootpw
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpw
      MYSQL_DATABASE: demo
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:


Commands

docker-compose up -d
docker-compose ps
docker-compose logs web
docker-compose down --volumes






FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


FROM tomcat:9.0
COPY target/*.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8081
CMD ["catalina.sh", "run"]




















# ===========================
# STEP 1 — MAVEN BUILD
# ===========================
mvn clean package                         # Cleans old builds & compiles project into JAR/WAR
dir target                                # Lists files in target folder to verify build
# Optional run for JAR
java -jar target\demoapp-0.0.1-SNAPSHOT.jar  # Runs Spring Boot app locally

# ===========================
# STEP 2 — GIT & GITHUB
# ===========================
git init                                   # Initialize Git repository
git config --global user.name "YourName"  # Set Git username globally
git config --global user.email "you@example.com"  # Set Git email globally

git add .                                  # Stage all files
git commit -m "Initial commit - demoapp"  # Commit changes

git checkout -b feature/add-endpoint       # Create & switch to feature branch
# Add TimeController.java in the specified location
git add src/main/java/com/example/demoapp/TimeController.java  # Stage new file
git commit -m "Add /time endpoint"        # Commit the new feature

git checkout master                        # Switch to main branch
git merge feature/add-endpoint              # Merge feature branch
git branch -M main                          # Rename master → main

git remote add origin https://github.com/<username>/demoapp-lab-practice.git  # Link GitHub repo
git push -u origin main                     # Push commits to GitHub

# ===========================
# STEP 3 — DOCKER (JAR)
# ===========================
# Dockerfile content for JAR:
# FROM eclipse-temurin:17-jdk-alpine
# ARG JAR_FILE=target/*.jar
# COPY ${JAR_FILE} /app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

docker build -t demoapp:v1 .              # Build Docker image
docker images                              # List Docker images
docker run -d -p 8080:8080 --name demoapp demoapp:v1  # Run container
docker ps                                  # List running containers

docker login                               # Login to Docker Hub
docker tag demoapp:v1 <dockerhub-username>/demoapp:v1  # Tag image
docker push <dockerhub-username>/demoapp:v1             # Push image to Docker Hub

# ===========================
# STEP 4 — DOCKER (WAR)
# ===========================
# Dockerfile content for WAR:
# FROM tomcat:9.0
# COPY target/*.war /usr/local/tomcat/webapps/demoapp.war
# EXPOSE 8080
# CMD ["catalina.sh", "run"]

docker build -t demoapp-war:v1 .          # Build Docker image for WAR
docker images                              # List images
docker run -d -p 8080:8080 --name demoapp-war demoapp-war:v1  # Run WAR container
docker ps                                  # List running containers

docker login                               # Login to Docker Hub
docker tag demoapp-war:v1 <dockerhub-username>/demoapp-war:v1  # Tag image
docker push <dockerhub-username>/demoapp-war:v1                # Push image

# ===========================
# STEP 5 — DOCKER COMPOSE
# ===========================
# docker-compose.yml content:
# version: '3.8'
# services:
#   web:
#     image: <dockerhub-username>/demoapp:v1   # Use demoapp-war:v1 for WAR
#     ports:
#       - "8080:8080"
#     depends_on:
#       - db
#     environment:
#       SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/demo
#       SPRING_DATASOURCE_USERNAME: root
#       SPRING_DATASOURCE_PASSWORD: rootpw
#   db:
#     image: mysql:8.0
#     environment:
#       MYSQL_ROOT_PASSWORD: rootpw
#       MYSQL_DATABASE: demo
#     ports:
#       - "3306:3306"
#     volumes:
#       - db-data:/var/lib/mysql
# volumes:
#   db-data:

docker-compose up -d                      # Start services in background
docker-compose ps                         # Show running services
docker-compose logs web                    # Show logs of web service
docker-compose down --volumes             # Stop & remove containers/volumes

