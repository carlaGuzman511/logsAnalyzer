#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Verificar dependencias necesarias
for cmd in mysql python3.11 npm ng; do
  command -v $cmd >/dev/null 2>&1 || { echo >&2 "$cmd is not installed. Aborting."; exit 1; }
done

# Cargar variables desde .env si existe
if [ -f ".env" ]; then
  echo "Cargando variables del entorno desde .env..."
  set -a
  source .env
  set +a
fi

# Verificar que las variables necesarias están definidas
if [ -z "$DB_NAME" ] || [ -z "$DB_PASSWORD" ]; then
  echo "Error: DB_NAME or DB_PASSWORD not set in .env"
  exit 1
fi

echo "Starting MariaDB service..."
sudo systemctl start mariadb

echo "Cloning the repository (branch: feature/db)..."
git clone -b feature/db https://github.com/carlaGuzman511/logsAnalyzer.git
cd logsAnalyzer

echo "Repository cloned."

echo "Setting up backend..."
cd logs-analyzer-api/

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
  python3.11 -m venv venv
fi

source venv/bin/activate

pip3 install -r requirements.txt

echo "Checking if database exists..."
DB_EXISTS=$(mysql -u root -p"${DB_PASSWORD}" -sse "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DB_NAME}'")
if [ -z "$DB_EXISTS" ]; then
  echo "Database ${DB_NAME} does not exist. Creating..."
  mysql -u root -p"${DB_PASSWORD}" -e "CREATE DATABASE ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
else
  echo "Database ${DB_NAME} already exists."
fi

echo "Creating database tables..."
python3.11 -m data

echo "Initializing log state files..."
for state_file in apache_access_log.state apache_error_log.state vsftpd_log.state; do
  echo 0 > "$state_file"
done

echo "Starting backend (Flask)..."
nohup python3.11 app.py > flask.log 2>&1 &

echo "Setting up frontend..."
cd ../logs-analyzer-web/

npm install

echo "Starting frontend (Angular)..."
nohup ng serve --open > angular.log 2>&1 &

echo "✅ All services are running. Open http://localhost:4200/ in your browser."
