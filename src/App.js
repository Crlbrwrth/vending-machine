import './App.css'
import { setStoredValue } from './localStorageTools'
import { restockCash, purchase } from './cashFloatTools'

function App ({ props }) {
  return (
    <div className='App'>
      <header className='App-header'>
        <p onClick={
          () => setStoredValue('cashFloat', restockCash({ standard: true }))
        }
        >
          restock coins
        </p>
        <p onClick={() => console.log(purchase(3, { 2: 1, 0.1: 11 }))}>
          test purchase
        </p>
      </header>
    </div>
  )
}

export default App
