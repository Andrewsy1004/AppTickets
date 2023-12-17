import data from '../database/data.json' assert { type: 'json' };
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

class Ticket {
  constructor(numero, escritorio, nombre, descripcion = '', urgencia = 0) {
    this.numero = numero;
    this.escritorio = escritorio;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.urgencia = urgencia;
  }
}

export default class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
  }

  init() {
    const { ultimo, hoy, tickets, ultimos4 } = data;

    if (hoy === this.hoy) {
        this.ultimo = ultimo;
        this.tickets = tickets;
        this.ultimos4 = ultimos4;
    } else {
       this.guardarDb();
    }
  }

  guardarDb() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const pathDB = path.join(__dirname, '../database/data.json');
    fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
  }

  siguiente(nombre, descripcion = '', urgencia = 1) {
    this.ultimo++;
    const ticket = new Ticket(this.ultimo, null, nombre, descripcion, urgencia);
    this.tickets.push(ticket);

    this.guardarDb();

    if (this.tickets.length > 1) {
      this.ordenarPorUrgencia(); 
    }

    return `Ticket ${this.ultimo}`;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return 'No hay tickets';
    }

    const ticket = this.tickets.shift();
    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }

    this.guardarDb();
    return ticket;
  }

  ordenarPorUrgencia() {
    this.tickets.sort((a, b) => b.urgencia - a.urgencia);
    this.guardarDb();
  }
}
