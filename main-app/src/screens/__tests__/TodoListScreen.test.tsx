import {screen} from '@testing-library/dom'
import {App} from '../../App'
import userEvent from '@testing-library/user-event'
import {testUtil} from '../../tests/testUtils'

describe('TodoListScreen', () => {
  test('Initially a user should see welcome screen with create todo button', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    screen.getByText('Welcome to the Todo App')
    const createTodoButton = screen.getByRole('button', {name: /create todo/i})
    await screen.findByText(/sample todo/i)

    await userEvent.click(createTodoButton)

    screen.getByRole('dialog')

    const titleBox = screen.getByRole('textbox', {name: /title/i})
    const saveButton = screen.getByRole('button', {name: /save/i})

    await userEvent.click(saveButton)

    screen.getByText('Please enter a title')

    await userEvent.type(titleBox, 'Test Todo')
    expect(screen.queryByText('Please enter a title')).toBeNull()

    await userEvent.click(saveButton)

    await screen.findByText(/Test Todo/i)
  })
})
