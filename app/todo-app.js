'use strict'

const todos = getSavedTodos()

renderTodos(todos)

document.querySelector('#new-todo-container').addEventListener('submit', (e) => {
    e.preventDefault()

    todos.push({
        id: uuidv4(),
        text: e.target.elements.text.value,
        completed: false
    })
    saveTodos(todos)
    renderTodos(todos)
    
    e.target.elements.text.value = ''
})

