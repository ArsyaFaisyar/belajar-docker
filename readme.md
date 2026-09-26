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


# Kenapa bisa gak error pada tahapan deployment?
## Penyebab error sebelumnya
Errornya di sebabkan pada tahapan health API, dimana curlnya ngehit ke alamat ip server (http://ip-server:port-aplikasi\health)
seharunya kareana kita belum setting web server dan belum port tunnel juga, maka API gak bisa di akses dari luar.

## Preview Hasil
<img src="./img-readme/Screenshot 2026-09-26 220711.png">


## Apa yang berubah?
Yang berubah, ada di taahapan pengecekan health api 
```yaml
- name: Verify application health
        run: |
          MAX_RETRIES=12
          RETRY_INTERVAL=5

          echo "========================================"
          echo "Starting health check"
          echo "========================================"

          for attempt in $(seq 1 $MAX_RETRIES); do

            echo ""
            echo "Health check attempt $attempt/$MAX_RETRIES"

            if ssh \
              -o StrictHostKeyChecking=accept-new \
              -o UserKnownHostsFile="$HOME/.ssh/known_hosts" \
              "$VPS_USER@$VPS_HOST" \
              "curl --fail --silent --max-time 5 http://localhost:3060/health > /dev/null"
            then

              echo ""
              echo "========================================"
              echo "Deployment berhasil."
              echo "Health check berhasil."
              echo "========================================"

              exit 0

            fi

            echo "Aplikasi belum siap."
            echo "Menunggu $RETRY_INTERVAL detik..."

            sleep $RETRY_INTERVAL

          done

          echo ""
          echo "========================================"
          echo "Health check gagal."
          echo "========================================"

          exit 1

```

disana kita ngecek health api, melalui alamat localhost, karena memang sedari awal API running, tetapi karena kita mendesain untuk cek dari alamat IP Server maka tidak dapat di akses, dan proses build jadi gagal

