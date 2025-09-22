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
