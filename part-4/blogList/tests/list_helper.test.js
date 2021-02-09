const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('returns 0 for empty list', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when only one item, return likes for that item', () => {
    const blogs = [{ name: 'test', likes: 3 }]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(3)
  })

  test('larger list should return sum of likes in the list', () => {
    const blogs = [{ name: 'test 1', likes: 10 }, { name: 'test 1', likes: 7 }, { name: 'test 1', likes: 2 }]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(19)
  })
})

describe('favorite blog', () => {
  test('returns empty object, if array is empty', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('returns blog, if only one in list', () => {
    const blogs = [{ name: 'Test with one in list', likes: 5 }]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('returns blog with most likes, if more in list', () => {
    const blogs = [{ name: 'test with two in list', likes: 20 }, { name: 'test 1', likes: 7 }, { name: 'test 1', likes: 2 }]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

})

describe('most blogs', () => {
  test('returns empty object, if array is empty', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({})
  })

  test('returns author with most blogs including blog count', () => {
    const blogs = [
      { name: 'Blog title 1', author: 'Most blogs author', likes: 1 },
      { name: 'Blog title 2', author: 'Most blogs author', likes: 2 },
      { name: 'Blog title 3', author: 'Most blogs author', likes: 3 },
      { name: 'Blog title 4', author: 'Middle author', likes: 4 },
      { name: 'Blog title 2', author: 'Most blogs author', likes: 2 },
      { name: 'Blog title 5', author: 'Middle author', likes: 5 },
      { name: 'Blog title 6', author: 'Least blogs author', likes: 100 },
      { name: 'Blog title 2', author: 'Most blogs author', likes: 2 }
    ]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Most blogs author', blogs: 5 })
  })

  test('returns author, if only one in list', () => {
    const blogs = [{ name: 'Blog title 1', author: 'Most blogs author', likes: 10000 }]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Most blogs author', blogs: 1 })
  })
})

describe('most likes', () => {
  test('returns empty object, if array is empty', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({})
  })

  test('returns author with highest total likes, if many in array', () => {
    const blogs = [
      { name: 'Blog title 1', author: 'Author with most likes', likes: 555 },
      { name: 'Blog title 1', author: 'Author with some likes', likes: 1 },
      { name: 'Blog title 1', author: 'Author with least likes', likes: 1 },
      { name: 'Blog title 1', author: 'Author with most likes', likes: 555 },
      { name: 'Blog title 1', author: 'Author with some likes', likes: 1 },
      { name: 'Blog title 1', author: 'Author with some likes', likes: 9999 },
      { name: 'Blog title 1', author: 'Author with least likes', likes: 1 },
      { name: 'Blog title 1', author: 'Author with most likes', likes: 555 },
      { name: 'Blog title 1', author: 'Author with least likes', likes: 555 },
      { name: 'Blog title 1', author: 'Author with most likes', likes: 9999 }
    ]
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Author with most likes', likes: 11664 })
  })

  test('returns author with likes, if only on in array', () => {
    const blogs = [{ name: 'Blog title 1', author: 'Some author', likes: 4 }]
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Some author', likes: 4 })
  })
})