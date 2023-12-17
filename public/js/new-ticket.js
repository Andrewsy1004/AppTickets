const nameInput = document.querySelector('#name');
const description = document.querySelector('#description');
const urgency = document.querySelector('#urgency');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

btnCrear.addEventListener('click', (event) => {
    event.preventDefault();

    const nameValue = nameInput.value;
    const descriptionValue = description.value;
    const urgencyValue = urgency.value;

    const payload = {
        name: nameValue,
        description: descriptionValue,
        urgency: urgencyValue,
        fecha: new Date().getTime()
    }

    console.log(payload);
    
    socket.emit('next-ticket', payload, (id) => {
        console.log('From server', id);
    });
    
    nameInput.value = '';
    description.value = '';
});
