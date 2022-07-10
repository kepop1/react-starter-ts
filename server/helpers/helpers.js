/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const util = require('util')

const readFromFile = util.promisify(fs.readFile)
const writeToFile = util.promisify(fs.writeFile)

const USERS_FILE_PATH = path.join(process.cwd(), '/db/users.json')

const getUsers = async () => {
  try {
    const data = await readFromFile(USERS_FILE_PATH)
    const users = JSON.parse(data)

    return users
  } catch (error) {
    return []
  }
}

const findUserById = async userId => {
  try {
    const users = await getUsers()
    const foundUser = users.find(user => user.id === userId)

    return foundUser
  } catch (error) {
    return null
  }
}

const findUserByEmail = async email => {
  try {
    const users = await getUsers()
    const foundUser = users.find(user => user.email === email)

    return foundUser
  } catch (error) {
    return null
  }
}

const addUser = async newUser => {
  try {
    const users = await getUsers()

    const newUserList = users.length ? [...users, newUser] : [newUser]

    const usersString = JSON.stringify(newUserList, null, 2)

    await writeToFile(path.join(USERS_FILE_PATH), usersString)

    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  findUserById,
  findUserByEmail,
  addUser,
}
