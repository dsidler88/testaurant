npx prisma db push
this reads the schema and generates or updates the db
localhost:3000/api/seed will seed your db with dummy data

running postgres in a local docker container:
docker run --name testaurant -e POSTGRES_PASSWORD=password -p 54320:5432 -d postgres
