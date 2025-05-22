#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Cloning the repository (branch: feature/db)..."
git clone -b feature/db https://github.com/carlaGuzman511/logsAnalyzer.git
cd logsAnalyzer

echo "Repository cloned."

echo "Setting up backend..."
cd logs-analyzer-api/

# Create virtual environment if not exists
if [ ! -d "venv" ]; then
  python3.11 -m venv venv
fi

source venv/bin/activate

pip3 install -r requirements.txt

echo "Creating database tables..."
python3.11 -c "from data import create_tables; create_tables()"

# Ensure state files exist and are initialized to 0
echo "Initializing log state files..."
touch apache_access_log.state apache_error_log.state vsftpd_log.state
echo 0 > apache_access_log.state
echo 0 > apache_error_log.state
echo 0 > vsftpd_log.state

echo "Starting backend (Flask)..."
nohup python3.11 app.py > flask.log 2>&1 &

echo "Starting MariaDB service..."
sudo systemctl start mariadb

echo "TIP: You can login to MySQL using: mysql -u root -p"

echo "Setting up frontend..."
cd ../logs-analyzer-web/

npm install

echo "Starting frontend (Angular)..."
nohup ng serve --open > angular.log 2>&1 &

echo "All services are running. Open http://localhost:4200/ in your browser."
