import http,  { ServerResponse } from 'node:http';
import url  from 'url'
import 'dotenv/config'

const port = process.env.PORT || 3000;

interface User {
  id: string;
  name: string;
}

const users: Array<User> = []

const server = http.createServer((req, res: ServerResponse) => {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url as string, true);
    const userId = parsedUrl.pathname!.split('/')[2]

    if (req.url === '/users') {
      console.log('get users route')
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('Good try')
    }
    if (parsedUrl.pathname && parsedUrl.pathname.startsWith('/users/')) {
      const parsedUrl = url.parse(req.url as string, true);
      const userId = parsedUrl.pathname!.split('/')[2]
      const user = users.find(user => user.id === userId);
      console.log('USER')
      console.log(userId)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(userId)
    }
  }
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
});