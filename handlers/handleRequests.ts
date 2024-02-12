import { IncomingMessage, ServerResponse } from 'node:http'
import { randomUUID } from 'node:crypto'
import { isValidUUID, isValidUserModel } from '../utils/userIdUtils'
import { User } from '../types/UserIO'

let users: Array<User> = []

const setBadRequestAnswer = (res: ServerResponse, code: number, message: string) => {
  res.writeHead(code, { 'Content-Type': 'text/plain' })
  res.end(message)
} 

export const handleGetRequests = (req: IncomingMessage, res: ServerResponse): void => {

  if (req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))
  }

  if (req.url && req.url.startsWith('/api/users/')) {
    const userId = req.url.split('/')[3]
    const isValidUserUUID = isValidUUID(userId)

    if (isValidUserUUID) {
      const user = users.find(user => user.id === userId)
      
      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(user))
      } else {
        setBadRequestAnswer(res, 404, 'User not found')
      }
    } else {
      setBadRequestAnswer(res, 400, 'Invalid user id')
    }
  }
}

export const handlePostRequests = (req: IncomingMessage, res: ServerResponse): void => {
  try {
    if (req.url === '/api/users') {
      let userDataJSON = ''

      req.on('data', (chunk) => (userDataJSON += chunk))

      req.on('end', () => {
        const user = JSON.parse(userDataJSON)

        if(isValidUserModel(user)) {
          const userToSave = {...user, id: randomUUID() }
          users.push(userToSave)
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(users))
        } else {
          setBadRequestAnswer(res, 400, 'Invalid user data')
        }
      })

    }  else {
      setBadRequestAnswer(res, 400, 'Invalid url')
    }
  } catch (e) {
    console.log(e)
  }
}

export const handlePutRequests = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url && req.url.startsWith('/api/users/')) {
    const userId = req.url.split('/')[3]
    const isValidUserUUID = isValidUUID(userId)
    const user = users.find(user => user.id === userId)
    if (isValidUserUUID && user) {
      
      let userDataJSON = ''
      
      req.on('data', (chunk) => (userDataJSON += chunk))
      
      req.on('end', () => {
        const userData = JSON.parse(userDataJSON)

        if(isValidUserModel(userData)) {
          const usersWithoutUpdated = users.filter((u) => u.id !== user.id)
          users = [...usersWithoutUpdated, {...userData, id: userId}]
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(users))
        } else {
          setBadRequestAnswer(res, 400, 'Invalid data')
        }
      })
    } else {
      setBadRequestAnswer(res, 400, 'Invalid user id')
    }
  } else {
    setBadRequestAnswer(res, 400, 'Invalid url')
  }
}

export const handleDeleteRequests = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.url && req.url.startsWith('/api/users/')) {
    const userId = req.url.split('/')[3]
    const isValidUserUUID = isValidUUID(userId)

    if (isValidUserUUID) {
      const user = users.find(user => user.id === userId)
      
      if (user) {
        users = users.filter((u) => u.id !== user.id)
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('User was deleted successfully')
      } else {
        setBadRequestAnswer(res, 404, 'User not found')
      }
    } else {
      setBadRequestAnswer(res, 400, 'Invalid user id')
    }
  } else {
    setBadRequestAnswer(res, 400, 'Invalid url')
  }
}