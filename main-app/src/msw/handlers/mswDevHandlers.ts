import {HttpResponse, http} from 'msw'
import {userMockDb} from '../mockDbs/userMockDb'
import {API_BASE_URL, IS_MOCK_ENV} from '../../constants/appConstants'
import type {IUser} from '../../types/IUser'
import type {ITodo} from '../../types/ITodo'

const sendResponse = <T>(res: T): HttpResponse<{data: T}> => {
  return HttpResponse.json({data: res})
}

const delayedResponse = async (delay = 1000): Promise<void> => {
  if (IS_MOCK_ENV)
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, delay)
    })
}

export const mswDevHandlers = [
  http.get(`${API_BASE_URL}user`, () => {
    const user = userMockDb.getUser()
    return sendResponse<IUser>(user)
  }),
  http.post(`${API_BASE_URL}todos`, async ({request}) => {
    await delayedResponse()

    const {title} = (await request.json()) as {title: string}
    if (!title || title.trim() === '') {
      return HttpResponse.json({error: 'Title is required'}, {status: 400})
    }

    const newTodo: ITodo = {id: 1, title, status: 'active'}
    return sendResponse(newTodo)
  }),
]
