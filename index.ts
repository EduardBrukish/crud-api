import http,  { IncomingMessage, ServerResponse } from 'node:http'
import 'dotenv/config'
import { handleGetRequests, handlePostRequests, handlePutRequests, handleDeleteRequests } from './handlers/handleRequests'

const port = process.env.PORT || 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

  switch (req.method) {
    case 'GET': 
      handleGetRequests(req, res)
    break 
    case 'POST': 
      handlePostRequests(req, res)
    break 
    case 'PUT': 
    handlePutRequests(req, res)
    break 
    case 'DELETE': 
    handleDeleteRequests(req, res)
    break 
    default:
      break
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

server.on('error', (err) => {
  throw err;
});