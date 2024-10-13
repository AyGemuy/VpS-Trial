const express = require('express');
const { exec } = require('child_process');

// Inisialisasi express
const app = express();
const port = 3000;

// Route untuk mengeksekusi perintah shell
app.get('/run', (req, res) => {
  exec('curl -sSL https://dokploy.com/install.sh | sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`Error executing command: ${error.message}`);
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send(`Error in shell: ${stderr}`);
    }

    console.log(`Stdout: ${stdout}`);
    res.send(`Command executed successfully: ${stdout}`);
  });
});

// Route untuk mengecek server
app.get('/', (req, res) => {
  res.send('Server is alive!');
});

// Jalankan server Express
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
