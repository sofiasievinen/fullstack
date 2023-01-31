const initialBlogs = [
    {
        "title": "testiblogi",
        "author": "testaaja 1",
        "url": "www.testi.fi",
        "likes": 1432
      },
      {
        "title": "kokeilu",
        "author": "testaaja 2",
        "url": "www.kokeilu.fi",
        "likes": 36
      },
  ]

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
      }
    
      return blogs.reduce(reducer, 0)
    
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    let biggest = blogs[0].likes
    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > biggest) {
            favorite = blogs[i]
            biggest = blogs[i].likes
        }
    }
    const ret = {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
    return ret
}

const mostBlogs = (blogs) => {
    a = Array(blogs.length).fill(0)
    for (let i = 0; i < blogs.length; i++) {
        for (let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === blogs[i].author) {
                a[i] += 1
            }
        }
    }
    let biggest = 0
    for (let i = 1; i < blogs.length; i++) {
        if (a[i] > biggest) {
            biggest = i
        }
    }
    const ret = {
        author: blogs[biggest].author,
        blogs: biggest
    }
    return ret
}

const mostLikes = (blogs) => {
    a = Array(blogs.length).fill(0)
    for (let i = 0; i < blogs.length; i++) {
        for (let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === blogs[i].author) {
                a[i] += blogs[j].likes
            }
        }
    }
    let biggest = 0
    let index = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] > biggest) {
            biggest = a[i]
            index = i
        }
    }
    const ret = {
        author: blogs[index].author,
        likes: a[index]
    }
    
    return ret
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }