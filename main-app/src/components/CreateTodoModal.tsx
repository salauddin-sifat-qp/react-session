import {
  WuButton,
  WuFormGroup,
  WuIcon,
  WuInput,
  WuInputError,
  WuLabel,
  WuModal,
  WuModalClose,
  WuModalContent,
  WuModalFooter,
  WuModalHeader,
} from '@npm-questionpro/wick-ui-lib'
import React from 'react'
import type {ITodo} from '../types/ITodo'

export type ICreateModalProps = {
  onSuccess?: (title: string) => void
}
export const CreateModal: React.FC<ICreateModalProps> = (
  props,
): React.JSX.Element => {
  const {onSuccess} = props

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>('')
  const [isError, setIsError] = React.useState(false)

  const resetState = (): void => {
    setTitle('')
    setIsOpen(false)
  }

  const handleTitleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value
    if (value.trim() !== '') setIsError(false)
    setTitle(value)
  }
  const handleSave = async (): Promise<void> => {
    if (!title) return setIsError(true)
    setIsLoading(true)
    try {
      await postTodo(title)
      if (onSuccess) onSuccess(title)
      resetState()
    } catch {
      throw new Error('Failed to create todo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <WuButton onClick={() => setIsOpen(true)} Icon={<WuIcon icon="wm-add" />}>
        Create Todo
      </WuButton>
      <WuModal open={isOpen} onOpenChange={setIsOpen}>
        <WuModalHeader>Create Todo</WuModalHeader>
        <WuModalContent>
          <WuFormGroup
            className="wu-form-group"
            Input={
              <WuInput
                type="text"
                title={title}
                onChange={handleTitleOnChange}
                placeholder="Title"
                aria-label="title"
                required
                style={{padding: '10px'}}
              />
            }
            Error={
              isError ? <WuInputError message="Please enter a title" /> : null
            }
            Label={<WuLabel>Todo Title</WuLabel>}
          ></WuFormGroup>
        </WuModalContent>
        <WuModalFooter>
          <WuModalClose variant="secondary">Close</WuModalClose>
          <WuButton loading={isLoading} onClick={handleSave}>
            Save
          </WuButton>
        </WuModalFooter>
      </WuModal>
    </>
  )
}

const postTodo = async (title: string): Promise<ITodo> => {
  const newTodo = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      return data.data as ITodo
    })

  return newTodo
}
