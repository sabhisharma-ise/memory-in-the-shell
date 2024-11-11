const express = require('express');
const db = require('./db');

const app = express();

app.use(express.urlencoded( {extended: true} ));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res)=>{
    
    try {
        const {keyword} = req.query;        
        let result;
        
        if (keyword) {
            // Query: to find all commands that contain the keyword
            result = await db.pool.query('SELECT command FROM commands WHERE command ILIKE $1', [`%${keyword}%`]);         
        } else {
            // If no keyword is provided, return all commands
            result = await db.pool.query('SELECT command FROM commands;')
        }

        if (result.rows.length == 0) {
            return res.status(404).send('No matching commands found.\n');
        }

        const commands = result.rows.map(row => `> ${row.command}`).join('\n');
        res.status(200).send(`Matching commands: \n${commands}\n`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error\n');
    }
});

app.post('/', async (req, res)=>{
    try {
        const { command } = req.body;

        // Optional: Minimum length check
        if (!command || command.length < 2) {
            return res.status(400).send('Command must be at least 2 characters long.\n');
        }

        // Check: If the command already exists in the table
        const existingCommand = await db.pool.query('SELECT * FROM commands WHERE command = $1', [command]);
        if (existingCommand.rows.length > 0) {
            return res.status(409).send('Command already exists in the history.\n');
        }

        // POST: Insert a new command into the table
        const result = await db.pool.query('INSERT INTO commands (command) VALUES ($1)', [command]);
        res.status(201).send(`Command '${command}' is added successfully!\n`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error\n');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});