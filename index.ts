import http,  { ServerResponse } from 'node:http';
import url  from 'url'
import 'dotenv/config'
import { isValidUUID } from './utils/userIdUtils'

const port = process.env.PORT || 3000;
interface User {
  id: string;
  name: string;
}

const users: Array<User> = []

const server = http.createServer((req, res: ServerResponse) => {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url as string, true);

    if (req.url === '/users') {
      console.log('get users route')
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    }
    if (parsedUrl.pathname && parsedUrl.pathname.startsWith('/users/')) {
      const parsedUrl = url.parse(req.url as string, true);
      const userId = parsedUrl.pathname!.split('/')[2]
      const isValidUserUUID = isValidUUID(userId)

      if (isValidUserUUID) {
        const user = users.find(user => user.id === userId)
        
        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(user))
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('User not found')
        }
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end('Invalid user id')
      }
    }
  }
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`)
});