const fs = require('fs');
const yaml = require('js-yaml');

// Path ke file YAML
const yamlFile = './Windows 10 - RustDesk.yml';

try {
  // Baca file YAML
  const fileContents = fs.readFileSync(yamlFile, 'utf8');
  const data = yaml.load(fileContents);
  
  // Cetak data YAML
  console.log('Data dari Windows 10 - RustDesk.yml:', data);

  // Anda bisa menambahkan logika lain di sini
  // Misalnya, menjalankan konfigurasi yang ada di dalam file YAML
  if (data.installation === 'true') {
    console.log('Menjalankan instalasi RustDesk...');
    // Tambahkan logika instalasi di sini
  }

} catch (e) {
  console.log('Error membaca file YAML:', e);
}
