import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/users.js'
export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: (error) => alert('failed to sign up! ' + error.message),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }
  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
        disabled={!username || !password || signupMutation.isPending}
      />
    </form>
  )
}

/* In case of an error, we could also use the signupMutation.isError state and the response
  from the backend to show a more nicely formatted error message.
  const mutation = useMutation({
  mutationFn: (newTodo) => axios.post('/todos', newTodo),
});

// Accessing isError from the returned object
const { mutate, isError, error } = mutation;

return (
  <div>
    {isError && <p>An error occurred: {error.message}</p>}
    <button onClick={() => mutate({ id: 1, title: 'New Todo' })}>
      Create Todo
    </button>
  </div>
);
*/
