document.addEventListener('DOMContentLoaded', () => {

    const socket = io()

    const d = (selectorString) => document.querySelector(selectorString)

    const message = d('#message')
    const handle = d('#handle')
    const sendButton = d('#send')
    const output = d('#output')
    const feedback = d('#feedback')


    sendButton.addEventListener('click', () => {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        })
    })

    message.addEventListener('keypress', () => {
        socket.emit('typing', handle.value)
    })

    socket.on('chat', (data) => {
        feedback.innerHTML = ''
        output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`
    })

    socket.on('typing', (data) => {
        feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
    })



})
