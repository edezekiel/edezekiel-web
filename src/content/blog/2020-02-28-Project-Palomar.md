---
date: 2020-02-28
title: 'Project Palomar, Building a Spring Boot App the Agile Way'
slug: 2020-02-28-Project-Palomar
description:
published: true
tags: ['projects', 'agile', 'git']
---

I've spent the past month at Ubiquisoft building a new Spring Boot app. It has been a flurry of excitement, roadblocks, teamwork, and victories.

I'll refer to the Spring Boot app as "Palomar". Palomar is the backend for an iOS app. The persistence layer is an Oracle database.

I'm really happy with how the Palomar MVP turned out. The app requires zero configuration to install, has an in-memory database for development, and seeds the database with realistic data. It's also set up for Continuous Integration (GitHub Actions), and is ready to be dropped in a production environment.

This blog post highlights what I've learned about Spring Boot, Database Management, and Agile methodologies.

## Spring Boot

Palomar is my first professional Spring Boot app. I wanted it to be as easy as possible for a new developer to clone the repo down and start contributing quickly. So, I used spring profiles, a few Maven tricks, JPA, Hibernate, and h2 to help make this as easy as possible.

### Spring Profiles

Spring profiles allow for different configuration options to apply in different environments For example, you can use an in-memory database for testing and an actual database in production. Spring Profiles can be set using files in the "resources" folder.

Newly initialized spring boot apps have a "resources" folder with an "application.properties" file. Properties files are mainly used for Java related technologies to store configuration settings.

A colleague of mine recommended that I try switching from .properties to the .yml format instead. I prefer YAML because it is readable and widely supported.

I also discovered that you can have multiple application configuration files. For example, you can have a main "application.yml" file, an "application-dev.yml" for dev testing, an "application-oracle.yml", and so on.

In my base "application.yml" file, I used this setting:

```yml
spring:
  profiles:
    active: '@spring.profiles.active@'
```

This setting tells the app which configuration file to load, based on the active spring profile. For example, if the "dev" profile is active, it will load the configuration settings from "application-dev.yml".

### Maven Profiles

Project Palomar's pom.xml file lists several `profiles`, including "dev", "oracle", "prod", etc.:

```xml
<profiles>
  <profile>
    <id>dev</id>
    <activation>
      <activeByDefault>true</activeByDefault>
    </activation>
    <properties>
      <spring.profiles.active>dev</spring.profiles.active>
    </properties>
  </profile>
  <profile>
    <id>oracle</id>
    <properties>
      <spring.profiles.active>oracle</spring.profiles.active>
    </properties>
  </profile>
</profiles>
```

The dev profile is set to the default spring active profile. Thus, when a developer starts the app it will automatically load the settings in the "application-dev.yml" file.

To deploy the app to different environments, developers simply use the command line to tell maven which profile to use. For example:

```sh
mvn spring-boot:run -Drun.profiles=oracle
```

### Maven Internal Repositories

The Central Maven Repository is like the npm repository: it contains an incredible variety of dependencies (code written by someone else) that a developer can download and install in their project. However, some maven dependencies aren't available from the Central Repository.

There are a few workarounds to this issue. It is possible to simply download the dependency and save it on your local machine in .m2 directory. You can also set up a service like Archiva on your local machine. Once you are authenticated through Archiva you can then download certain dependencies.

One major drawback to these approaches is that it prohibits Continuous Integration ("CI"). For example, GitHub Actions can't build your app if it needs Archiva access or a specific dependency in folder on the build agent.

I eventually discovered that you can store a dependency in an "internal repository" inside your project. This requires you to add the repository to your pom profile, create a "repo" directory in your project, and save the dependency (a "jar" file) inside the repo directory.

```xml
<repositories>
  <repository>
    <id>PalomarRepo.local</id>
    <name>PalomarRepo</name>
    <url>file:${project.basedir}/repo</url>
  </repository>
</repositories>
```

Here is an [Apache guide](https://maven.apache.org/guides/introduction/introduction-to-repositories.html) on setting up internal repositories.

### JPA, Hibernate, and H2

Coming from a Ruby on Rails background, I've been spoiled with Active Record. It makes it soooo easy to model your relationships, create a schema, create seed data for testing purposes, and migrate the schema.

These things are possible with Spring Boot with a little extra effort a few dependencies ("Spring Data JPA", "H2").

### Spring Data JPA

The Spring Data JPA is an optional dependency that lets you "persist data in SQL stores with Java Persistence API using Spring Data and Hibernate." See [Spring Docs](https://spring.io/projects/spring-data-jpa).

The Java Persistence Layer ("JPA") is an industry standard for persisting Plain Old Java Objects. In the Spring Boot world, the "the JPA module of Spring Data contains a custom namespace that allows defining repository beans." [docs.spring.io](https://docs.spring.io/spring-data/jpa/docs/2.2.5.RELEASE/reference/html/#reference).

Hibernate is an implementation of the JPA specification. As explained in the [Hibernate docs](https://docs.jboss.org/hibernate/annotations/3.5/reference/en/html/entity.html), every persistent POJO class is an entity and is declared using the `@Entity` annotation. The `@Table` annotation allows you to define the table name for your entity mapping.

So, the code below means that you have a "Sky" class that should be persisted in a "tbl_sky" table:

```Java
@Entity
@Table(name="tbl_sky")
public class Sky implements Serializable {
   ...
}
```

### H2, data.sql

Another optional Spring Boot dependency is the "h2" driver. You can add the dependency when you create your app using the [Spring Boot Initializer](https://start.spring.io/), or simply add this dependency in your pom file:

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
```

h2 creates an in-memory database for local development. Add this to your "application-dev.yml" file to use h2:

```yml
spring:
  datasource:
    driverClassName: org.h2.Driver
    password: <any-password>
    url: jdbc:h2:mem:testdb
    username: <any-username>
```

### The data.sql and create.sql files

Spring Data JPA and H2 allow you to do a couple of helpful things with sql files in your project.

If you populate a "data.sql" file inside of the "resources" folder, your app will automatically add seed data to the in-memory database. This lets you develop in an environment that closely resembles production.

Additionally, adding the following statement to your "application-dev.yml" file will automatically make a create.sql file in your project that contains your project's schema:

```yml
jpa:
  database-platform: org.hibernate.dialect.H2Dialect
  properties:
    javax:
      persistence:
        schema-generation:
          create-source: metadata
          scripts:
            action: create
            create-target: create.sql
```

You can use the create.sql file as the basis for a schema.sql file in production. Not only does this save you from manually writing sql, it gives you confidence that your app will work across different environments.

## Agile Methodologies

One of my favorite parts about working on this project was the development process my team used. We went all-in with agile methodologies. We intentionally modeled our development life-cycle based on the [Extreme Programming](http://www.extremeprogramming.org/) flavor of Agile.

### Methodologies

Here are our core methodologies for this project:

1. [Most Important Features First](http://www.agile-process.org/byfeature.html)
2. Craftsmanship - "We who cut mere stones must always be envisioning cathedrals."
3. [Daily Standups](http://www.agile-process.org/communicate.html)
4. [Weekly Iterations](http://www.agile-process.org/heartbeat.html)
5. [Have Fun](http://www.agile-process.org/proverbs.html)
6. [Change is Welcome](https://agilemanifesto.org/principles.html)
7. [Monthly Release Planning (Beginning)](http://www.agile-process.org/iterative.html)
8. [Monthly Deployments (End)](http://www.agile-process.org/working.html)
9. [Story Points](https://www.youtube.com/watch?time_continue=2&v=Hwu438QSb_g)

### Tools: Trello, GitHub Actions, Gitflow

We use a few tools to help our development process stay agile:

1. Trello: issue tracking and backlog management;
2. GitHub Actions: Continuous Integration, automatically runs test and builds the backend;
3. [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow): easily manage releases and allows for new features to be added frequently.
4. Testing: JUnit, @SpringBootTest, etc.
