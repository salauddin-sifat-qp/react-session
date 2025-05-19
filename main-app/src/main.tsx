import {App} from './App.tsx'
import {IS_MOCK_ENV} from './constants/appConstants.ts'
import React from 'react'
import ReactDom from 'react-dom/client'
import '@npm-questionpro/wick-ui-icon/dist/wu-icon.css'
import '@npm-questionpro/wick-ui-lib/dist/style.css'
import './index.css'

async function enableMocking(): Promise<void> {
  if (!IS_MOCK_ENV) {
    return
  }

  const {mswDevServer} = await import('./msw/mswDevServer')
  const serviceWorkerUrl = `${import.meta.env.BASE_URL}mockServiceWorker.js`
  console.log(serviceWorkerUrl)

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await mswDevServer.start({
    serviceWorker: {
      url: serviceWorkerUrl,
      options: {
        scope: '',
      },
    },
  })
}

enableMocking().then(() => {
  ReactDom.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
