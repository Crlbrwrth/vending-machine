import { render, screen } from '@testing-library/react'
import App from './App'
import { getInputSum, restockCash } from './cashFloatTools'
import { STANDARD_COIN_RESTOCK } from './constants'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/restock/i)
  expect(linkElement).toBeInTheDocument()
})

test('getInputSum should return correct sum', () => {
  const result = getInputSum({ 2: 2, 1: 1, 0.5: 2, 0.2: 2, 0.1: 3 })
  expect(result).toEqual(6.7)
})

test('restockCash should return standard when flag is set', () => {
  const result = restockCash({ standard: true })
  expect(result).toStrictEqual(STANDARD_COIN_RESTOCK)
})