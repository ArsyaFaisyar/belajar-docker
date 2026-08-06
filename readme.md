# Command Docker
1. Lihat Container
```bash
docker ps
```
2. Stop Container
```bash
docker stop container_id
```
3. Running Docker
```bash
docker run -p 3060:3000 container_name
```
4. Running Docker Compose 
```bash
docker compose up
```
```bash
docker compose down
```
```bash
cp .env-example .env

5. Framework CI
```
```bash
npm i -D jest supertest

Cara menjalankan container untuk testing endpoint
```bash
docker compose -f docker-compose-test.yaml up --build --abort-on-container-exit --exit-code-from test
```
- `exit-code-from-test` => mengeluarkan output dari jest