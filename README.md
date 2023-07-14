# Testaurant: A NextJS 13 Opentable clone.

This application is a clone based on Opentable, useless other than for learning purposes. It features a modern stack of React, NextJS 13, Postgresql, Prisma, and TailwindCSS

## Database/Dummy Data

- The app uses Prisma. The schema is located in the _prisma_ folder. To generate the DB based on this schema, run `npx prisma db push`. This also updates it without wiping out data? 
- DB connection is currently configured to hit a local Postgres instance in a Docker container. But can easily be modified with any postgres DB URL.
- `docker run --name testaurant -e POSTGRES_PASSWORD=password -p 54320:5432 -d postgres`
- Once the DB is created, the dummy data can be seeded simply by visiting `localhost:3000/api/seed`
- NPX PRISMA STUDIO is a ridiculously useful tool for viewing your tables.
- 

## Auth

For learning purposes, I went with a custom authentication solution. It is secure, and use bcrypt to hash passwords, but still a better solution in a real world app would be OAuth or something similar. Using "jose" JWT manager

to apply changes based on schema changes
-npx prisma migrate reset
-npx prisma migrate dev