// const config = require('../utils/config')
// const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
    user: '65b6f1340815d10bac68f88f'
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
    user: '65b6f1340815d10bac68f88f'
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
    user: '65b6f1340815d10bac68f88f'
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 11,
    __v: 0,
    user: '65b6f1340815d10bac68f88f'
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
    user: '65b6f1340815d10bac68f88f'
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
    user: '65b6f1360815d10bac68f8a1'
  }
]
const newBlog = {
  title: 'Some Blog',
  author: 'Somebody',
  url: 'https://something.org',
  likes: 12
}

const dbBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const testUser =
{
  username: 'user1',
  name: 'Mr. User',
  password: 'pass123'
}

const initialUsers = [
  {
    _id: '65b6f1340815d10bac68f88f',
    username: 'user1',
    name: 'Mr. User One',
    blogList: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9',
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb'

    ],
    passwordHash: '$2b$10$UV51IG2biTFtJBTlOWGXhO6OCaT38zt3.7q39e1ccN9qB3xf5UwUC'

  },
  {
    _id: '65b6f1360815d10bac68f8a1',
    username: 'second',
    name: 'Sencond User',
    passwordHash: '$2b$10$UV51IG2biTFtJBTlOWGXhO6OCaT38zt3.7q39e1ccN9qB3xf5UwUC',
    blogList: [
      '5a422bc61b54a676234d17fc'
    ]

  }

]

const dbUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initializeDB = async () => {
  await clearDB()

  for (const blog of initialBlogs) {
    const newBlog = new Blog(blog)
    await newBlog.save()
  }
  for (const user of initialUsers) {
    const newUser = new User(user)
    await newUser.save()
  }
  // const blogObjects = initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)

  // const userObjects = initialUsers.map(user => new User(user))
  // const userPromiseArray = userObjects.map(user => user.save())
  // await Promise.all(userPromiseArray)
}
const clearDB = async () => {
  // await User.deleteMany({})
  // await Blog.deleteMany({})
  await User.collection.drop()
  await Blog.collection.drop()
}

module.exports = {
  newBlog,
  initialBlogs,
  initialUsers,
  dbBlogs,
  testUser,
  dbUsers,
  initializeDB
}
