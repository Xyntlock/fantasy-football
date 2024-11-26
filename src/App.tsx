import { useEffect, useState } from 'react'
import type { Schema } from '../amplify/data/resource'
import { Button, DarkThemeToggle, Flowbite, ListGroup } from 'flowbite-react'
import { generateClient } from 'aws-amplify/api'
import { Authenticator } from '@aws-amplify/ui-react'
import { signOut } from 'aws-amplify/auth'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>()

const App = () => {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    })
  }, [])

  function createTodo() {
    client.models.Todo.create({ content: window.prompt('Todo content') })
  }

  const handleClick = () => {
    signOut()
  }

  return (
    <Authenticator>
      <main className="flex gap-2 flex-col p-10">
        <Flowbite>
          <h1>My todos</h1>
          <Button pill onClick={createTodo}>
            + new
          </Button>
          <ListGroup>
            {todos.map((todo) => (
              <ListGroup.Item key={todo.id}>{todo.content}</ListGroup.Item>
            ))}
          </ListGroup>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <DarkThemeToggle />
        </Flowbite>
        <Button onClick={handleClick}>Sign Out</Button>
      </main>
    </Authenticator>
  )
}

export default App
