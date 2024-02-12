import { User } from '../types/UserIO'

export const isValidUUID = (str: string): boolean => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidPattern.test(str)
}

export const isValidUserModel = (userData: User): boolean => {
  const isValidUserNameField = Boolean(userData.name && (typeof userData.name === 'string'))
  const isValidUserAgeField = userData.age > 0 && typeof userData.age === 'number'
  const isValidUserHobbies = userData.hobbies && Array.isArray(userData.hobbies)

  return isValidUserNameField && isValidUserAgeField && isValidUserHobbies
} 