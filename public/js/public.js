const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('estado-actual', ( payload ) => {

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if( ticket1 ){
        lblTicket1.innerText = 'Ticket ' + ticket1.urgencia + ' - ' + ticket1.nombre;
        lblEscritorio1.innerText = ticket1.escritorio;
    }
    
    if( ticket2 ){
        lblTicket2.innerText = 'Ticket ' + ticket2.urgencia+ ' - ' + ticket2.nombre;
        lblEscritorio2.innerText = ticket2.escritorio;
    }
    
    if( ticket3 ){
        lblTicket3.innerText = 'Ticket ' + ticket3.urgencia+ ' - ' + ticket3.nombre;
        lblEscritorio3.innerText = ticket3.escritorio;
    }
    
    if( ticket4 ){
        lblTicket4.innerText = 'Ticket ' + ticket4.urgencia+ ' - ' + ticket4.nombre;
        lblEscritorio4.innerText = ticket4.escritorio;
    }
    
});