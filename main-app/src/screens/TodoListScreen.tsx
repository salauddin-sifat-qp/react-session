import {WuHeading, WuLoader} from '@npm-questionpro/wick-ui-lib'
import React from 'react'
import type {ITodo} from '../types/ITodo'
import {CreateModal} from '../components/CreateTodoModal'

interface IProps {
  userId?: string
}

export const TodoListScreen: React.FC<IProps> = () => {
  const [todos, setTodos] = React.useState<ITodo[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const onCreateTodo = (title: string): void => {
    setTodos(p => [...p, {title, status: 'active', id: p.length + 1}])
  }
  React.useEffect(() => {
    setIsLoading(true)
    const getData = async (): Promise<void> => {
      try {
        const res = await fetch('/api/todos')
        const data = await res.json()
        setTodos([...data.data])
      } catch {
        throw new Error('Failed to fetch todos')
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'start',
        alignItems: 'start',
      }}
    >
      <WuHeading>Welcome to the Todo App</WuHeading>
      <CreateModal onSuccess={onCreateTodo} />
      {isLoading ? (
        <WuLoader variant="spinner" size="lg" />
      ) : (
        <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {todos.map((todo, index) => (
            <li key={index}>
              {index + 1}. {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
