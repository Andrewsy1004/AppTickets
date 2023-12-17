import TicketControl from '../models/ticketControl.js';
const ticketControl = new TicketControl();

export const socketController = (socket) => {
    socket.emit("ultimo-ticket", ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const {description,urgency,fecha,name} = payload;
        const nuevoTicket = ticketControl.siguiente(name,description,urgency);
        callback(nuevoTicket);     
    });
    
    socket.on('atender-ticket', ({ escritorio }, callback) => {
        
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'Es escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );
         
        console.log( ticket );
        
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

        if ( ticket === 'No hay tickets' ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }

    })

};