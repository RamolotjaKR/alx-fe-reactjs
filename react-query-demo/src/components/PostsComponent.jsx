import { useQuery } from '@tanstack/react-query'

function PostsComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    }
  })

  if (isLoading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data?.slice(0, 10).map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostsComponent
