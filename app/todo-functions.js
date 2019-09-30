'use strict'

// Set Date
const now = moment()
const nowTimestamp = now.valueOf()
const day = moment(nowTimestamp).format('D')
const dateDescription = moment(nowTimestamp).format('ddd, MMMM YYYY')

// Feth existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try{
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}


// Render application
const renderTodos = (todos) => {
    const completeTodos = todos.filter((todo) => todo.completed)
    const totalTodos = todos.filter((todo) => todo.completed + !todo.completed)
    const totalPercent = document.createElement('span')

    document.querySelector('#date').innerHTML = ''
    document.querySelector('#percentage').innerHTML = ''
    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#date').appendChild(generateDayDom(day))
    document.querySelector('#date').appendChild(generateDayDom(dateDescription))
    
    document.querySelector('#percentage').appendChild(generateCompleteTodoDOM(completeTodos, totalTodos))
    document.querySelector('#percentage').appendChild(totalPercent)
    todos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDom(todo))
    })
    
}

// Get the DOM elements for Day
const generateDayDom = (day) => {
    const daySummary = document.createElement('p')
    daySummary.textContent = `${day}`
    return daySummary
}

// Get the DOM elements for Date Description
const generateDateDescriptionDom = (dateDescription) => {
    const dateSummary = document.createElement('p')
    dateSummary.textContent = `${dateDescription}`
    return dateSummary
}

// Get the DOM elements for complete todo Dom
const generateCompleteTodoDOM = (completeTodos, totalTodos) => {
    const completeSummary = document.createElement('span')
    completeSummary.style.width = `calc(${(completeTodos.length / totalTodos.length) * 100}%)`

    return completeSummary
}

// Get the DOM elements for an individual note
const generateTodoDom = (todo) => {
    const todoLi = document.createElement('li')
    const checkbox = document.createElement('input')
    const label = document.createElement('label')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', `${todo.id}`)
    checkbox.checked = todo.completed
    todoLi.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos)
    })

    // Setup the labels
    label.setAttribute('for', `${todo.id}`)
    todoLi.appendChild(label)

    // Setup the todo text
    todoText.textContent = todo.text
    if(checkbox.checked) {
        todoText.classList.add('checked')
    }
    todoLi.appendChild(todoText)

    // Setup the remove button
    removeButton.style.background = 'url(/images/delete.png) 50% 50% no-repeat'
    removeButton.style.backgroundSize = 'contain'
    todoLi.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos)
    })

    return todoLi
}

// control PopBox click event
const controlPopBox = () => {
    const cls = document.querySelector('.pop-box')
    if (cls.classList.contains('on')) {
        cls.classList.remove('on')
    } else {
        cls.classList.add('on')
    }
}