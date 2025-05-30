// file path: src/tests/setupTests.ts
import {afterEach} from 'vitest'
import {cleanup} from '@testing-library/react'
import * as ResizeObserverModule from 'resize-observer-polyfill'

import '@testing-library/dom'
import '@testing-library/jest-dom'
import {mswTestServer} from '../msw/mswTestServer'

beforeAll(() => {
  // https://stackoverflow.com/a/72543616/8596140
  // This is required by wick-ui-lib WuModal component
  window.ResizeObserver = ResizeObserverModule.default
  HTMLElement.prototype.scrollIntoView = vi.fn()
  mswTestServer.listen()
})

beforeEach(() => {})

afterEach(() => {
  // Reset all request handlers
  mswTestServer.resetHandlers()
  cleanup()
})

afterAll(() => {
  mswTestServer.close()
})
