import { getStoredValue, setStoredValue } from './localStorageTools'
import {
  VALID_COINS, STANDARD_COIN_RESTOCK, COIN_SLOT_LIMITS
} from './constants'
import { deductObjectProps, addUpObjectProps } from './helpers'

// main purchase handling function

export function purchase (price, input = {}) {
  const inputSum = getInputSum(input)
  const changeSum = Math.floor((inputSum - price) * 100) / 100

  if (price > inputSum) {
    return { success: false, message: 'insufficient input' }
  }
  if (isCoinSlotFull(input)) {
    return { success: false, message: 'coin slots are full' }
  }

  const change = returnChangeFromCashFloat(changeSum)
  if (!change) {
    return { success: false, message: 'could not return change' }
  }

  addCoinsToCashFloat(input)
  return { success: true, change }
}

// storage manipulation

function addCoinsToCashFloat (input = {}) {
  const cashFloat = getStoredValue('cashFloat')
  const result = Object.keys(cashFloat).reduce((acc, ele) => {
    return { ...acc, [ele]: cashFloat[ele] + (input[ele] || 0) }
  }, {})
  setStoredValue('cashFloat', result)
}

export function returnChangeFromCashFloat (changeSum) {
  const cashFloat = getStoredValue('cashFloat')

  const [updatedCashFloat, leftoverChangeSum] = takeChangeFromCashFloat(
    cashFloat, changeSum
  )

  if (leftoverChangeSum === 0) {
    const change = deductObjectProps(cashFloat, updatedCashFloat)
    setStoredValue('cashFloat', updatedCashFloat)
    return change
  }
  return false
}

// helper functions

export function restockCash ({ standard = false, coins = {} }) {
  if (standard) return STANDARD_COIN_RESTOCK
  const restock = VALID_COINS.reduce((acc, ele) => {
    if (coins[ele]) return { ...acc, [ele]: coins[ele] }
    return acc
  }, {})
  return restock
}

function takeChangeFromCashFloat (cashFloat, changeSum) {
  let leftoverChangeSum = changeSum
  return [
    Object
      .keys(cashFloat)
      .sort()
      .reverse()
      .reduce((acc, ele) => {
        let value = cashFloat[ele]
        while (leftoverChangeSum >= Number(ele) && value > 0) {
          value--
          leftoverChangeSum -= Number(ele)
        }
        return { ...acc, [ele]: Number(value) }
      }, {}),
    leftoverChangeSum
  ]
}

export function getInputSum (input = {}) {
  return Object.keys(input)
    .filter(ele => VALID_COINS.includes(Number(ele)))
    .reduce((acc, ele) => {
      if (input[ele] <= 0) return acc
      return acc + Number(ele) * input[ele]
    }, 0)
}

function isCoinSlotFull (input) {
  const cashFloat = getStoredValue('cashFloat')
  const updatedCashFloat = addUpObjectProps(cashFloat, input)
  return Object
    .keys(updatedCashFloat)
    .some(ele => updatedCashFloat[ele] > COIN_SLOT_LIMITS[Number(ele)])
}
