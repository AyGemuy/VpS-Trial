const express = require('express');
const shell = require('shelljs');

// Inisialisasi express
const app = express();

// Route untuk mengeksekusi perintah shell
app.get('/run', (req, res) => {
  shell.exec('curl -sSL https://dokploy.com/install.sh | sh', (code, stdout, stderr) => {
    if (code !== 0) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ message: `Error executing command: ${stderr}` });
    }
    console.log(`Stdout: ${stdout}`);
    res.json({ message: `Command executed successfully`, output: stdout });
  });
});

// Handler untuk Vercel
module.exports = app;
