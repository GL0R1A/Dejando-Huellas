// // websocket.js
// const WebSocket = require('ws');
// let clients = [];
// let reports = []; // Lista global de reportes

// const websocketHandler = (wss) => {
//     wss.on('connection', (ws) => {
//         // Enviar todos los reportes existentes al nuevo cliente conectado
//         ws.send(JSON.stringify(reports));

//         // Agregar el cliente a la lista de clientes
//         clients.push(ws);

//         // Remover el cliente de la lista al desconectarse
//         ws.on('close', () => {
//             clients = clients.filter(client => client !== ws);
//         });
//     });
// };

// const broadcastReport = (report) => {
//     // Solo agregar a la lista si no está ya presente
//     const reportExists = reports.find(r => r.id === report.id);
//     if (!reportExists) {
//         reports.push(report);
//     }

//     // Enviar el nuevo reporte a todos los clientes conectados
//     clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify([report])); // Enviar solo el nuevo reporte
//         }
//     });
// };

// module.exports = {
//     websocketHandler,
//     broadcastReport,
//     reports
// };