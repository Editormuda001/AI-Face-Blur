#!/bin/bash

# Nama file untuk menyimpan daftar package yang dibutuhkan
REQUIREMENTS_FILE="requirements.txt"

# Fungsi untuk mengecek apakah sebuah package sudah terinstall
check_package() {
    if npm list "\$1" >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Membuat file requirements.txt jika belum ada
if [ ! -f "$REQUIREMENTS_FILE" ]; then
    echo "express" > "$REQUIREMENTS_FILE"
    echo "multer" >> "$REQUIREMENTS_FILE"
    echo "face-api.js" >> "$REQUIREMENTS_FILE"
    echo "canvas" >> "$REQUIREMENTS_FILE"
    echo "Requirements file created."
else
    echo "Requirements file already exists."
fi

# Membaca file requirements.txt dan menginstall package yang belum ada
while IFS= read -r package
do
    if ! check_package "$package"; then
        echo "Installing $package..."
        npm install "$package"
    else
        echo "$package is already installed."
    fi
done < "$REQUIREMENTS_FILE"

# Mengecek keberadaan folder 'models'
if [ ! -d "models" ]; then
    echo "Error: 'models' folder not found. Please download face-api.js models and place them in a 'models' folder."
    exit 1
fi

# Mengecek keberadaan folder 'public'
if [ ! -d "public" ]; then
    echo "Creating 'public' folder..."
    mkdir public
fi

# Mengecek keberadaan file server.js
if [ ! -f "server.js" ]; then
    echo "Error: server.js not found. Please create the server.js file."
    exit 1
fi

# Menjalankan server Node.js
echo "Starting Node.js server..."
node server.js
