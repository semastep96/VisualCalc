function Calc(operator, a, b) {

  const isDevisibleByZero = (operator === 'div' || operator === 'rem') && b === 0;

  const operations = {
    sum: a + b,
    sub: a - b,
    mult: a * b,
    div: a / b,
    rem: a % b,
    exp: a ** b,
  }

  // Errors 
  if (isNotValidNumber(a) || isNotValidNumber(b)) { return 'Error' }

  if (isDevisibleByZero) { return 'Error' }

  if (!operations[operator]) {return 'unknown operator'}

  // Actions
  
  return operations[operator]
  
}

function isNotValidNumber(num) {

  return (typeof num !== 'number' || num !== num || num === Infinity || num === -Infinity);

}

const input = document.querySelector('.input_text')
const numPad = {
  zero: document.querySelector('.btn-zero'),
  one: document.querySelector('.btn-one'),
  two: document.querySelector('.btn-two'),
  tree: document.querySelector('.btn-three'),
  four: document.querySelector('.btn-four'),
  five: document.querySelector('.btn-five'),
  six: document.querySelector('.btn-six'),
  seven: document.querySelector('.btn-seven'),
  eight: document.querySelector('.btn-eight'),
  nine: document.querySelector('.btn-nine'),
  clear: document.querySelector('.btn-clear'),
  delete: document.querySelector('.btn-delete'),
  div: document.querySelector('.btn-div'),
  mult: document.querySelector('.btn-mult'),
  sub: document.querySelector('.btn-sub'),
  sum: document.querySelector('.btn-sum'),
  result: document.querySelector('.btn-result'),
}

let a = 0
let b = 0
let action

function addEventListeners() {
  function addNumListeners () {
    function addListener (btnName) {
      numPad[btnName].addEventListener('click', function () {
        const isNewNum = input.textContent === '0' || (a && action && input.textContent !== '-') || action === 'result'
        if (isNewNum) {
          if (action === 'result') {
            action = ''
          }
          input.textContent = numPad[btnName].textContent
          return
        }
        input.textContent += numPad[btnName].textContent
      })
    }

    addListener('zero')
    addListener('one')
    addListener('two')
    addListener('tree')
    addListener('four')
    addListener('five')
    addListener('six')
    addListener('seven')
    addListener('eight')
    addListener('nine')
  }
  addNumListeners()

  function addActionBtnListeners () {
    numPad.clear.addEventListener('click', function () {
      input.textContent = '0'
      a = 0
      b = 0
      action = ''
    })

    numPad.delete.addEventListener('click', function () {
      if (input.textContent.length === 1) {
        input.textContent = '0'
        return
      }
      input.textContent = input.textContent.slice(0, -1)
    })

    function addActionListener(actionName) {
      numPad[actionName].addEventListener('click', function () {
        let isNewNum = ((!a && input.length === 1) || (a && !b && actionName))
        if (actionName === 'sub' && isNewNum) {
          input.textContent = '-'
          return
        }
        if (action && action !== 'result') {
          b = Number(input.textContent)
          input.textContent = Calc(action, a, b)
          a = Number(input.textContent)
          b = 0
          action = actionName
        }
        a = Number(input.textContent)
        action = actionName
      })
    }

    addActionListener('div')
    addActionListener('mult')
    addActionListener('sub')
    addActionListener('sum')

    numPad.result.addEventListener('click', function () {
      if (a && action) {
        b = Number(input.textContent)
        input.textContent = Calc(action, a, b)
        a = 0
        b = 0
        action = 'result'
      }
    })
  }
  addActionBtnListeners()
}

addEventListeners()







