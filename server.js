const net = require('net');


let clients = [];

const server = net.createServer((socket) => {
    console.log('New client connected:', socket.remoteAddress);


    clients.push(socket);

   
    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log(`Message from ${socket.remoteAddress}: ${message}`);

        
        clients.forEach((client) => {
            if (client !== socket) {
                client.write(`Client ${socket.remoteAddress}: ${message}\n`);
            }
        });
    });

    
    socket.on('end', () => {
        console.log('Client disconnected:', socket.remoteAddress);
        clients = clients.filter((client) => client !== socket);
    });

    
    socket.on('error', (err) => {
        console.error('Error with client:', err.message);
    });
});


const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Chat server started on port ${PORT}`);
});
