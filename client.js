const net = require('net');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const client = net.createConnection({ host: '127.0.0.1', port: 4000 }, () => {
    console.log('Connected to chat server!');
    console.log('Type your messages below:');
});


client.on('data', (data) => {
    console.log(data.toString().trim());
});


rl.on('line', (line) => {
    client.write(line);
});


client.on('end', () => {
    console.log('Disconnected from server.');
    rl.close();
});


client.on('error', (err) => {
    console.error('Error:', err.message);
    rl.close();
});
