import type {ITodo} from '../../types/ITodo'

export const todoMockDb = {
  getTodos: (): ITodo[] => [
    {id: 1, title: 'Sample Todo', status: 'active'},
    {
      id: 2,
      title: 'Another Todo',
      status: 'completed',
    },
  ],
}
