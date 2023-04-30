const http = require('http');
const fs = require('fs/promises');

const PORT = process.env.PORT || 8080;

async function pageHandler(req, res) {
  try {
    const pathname = req.url;
    let pageHTML;
    if (pathname === '/') {
      // Set pageURL for default path
      pageHTML = await fs.readFile(`./index.html`);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(pageHTML);
      res.end();
    } else {
      pageHTML = await fs.readFile(`.${pathname}.html`);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(pageHTML);
      res.end();
    }
  } catch (err) {
    console.error('Failed to resolve page ' + err);
    const pageHTML = await fs.readFile('./404.html');
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(pageHTML);
    res.end();
  }
}

const server = http.createServer(pageHandler);

server.listen(PORT, () => {
  console.log(`Server is now running at port ${PORT}`);
});
