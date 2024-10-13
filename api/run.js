const shell = require('shelljs');

// Eksekusi perintah shell
shell.exec('curl -sSL https://dokploy.com/install.sh | sh', (code, stdout, stderr) => {
  if (code !== 0) {
    console.error(`Error: ${stderr}`);
    process.exit(1); // Keluar dengan kode kesalahan
  }
  
  console.log(`Stdout: ${stdout}`);
  process.exit(0); // Keluar dengan sukses
});
