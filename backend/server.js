const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));// serves your frontend files

app.post('/solve', (req, res) => {
    const { scramble, solver, model } = req.body;

    if (!scramble || !solver || !model) {
        return res.status(400).json({ error: 'Missing required input fields' });
    }

    const args = [scramble, solver, model];

    // 🔁 Start timer
    const startTime = process.hrtime(); // high-resolution [seconds, nanoseconds]
    const path = require('path');
    const solverPath = path.join(__dirname, 'AlgoCubeSolver');
    execFile(solverPath, args, (error, stdout, stderr) => {
        const diff = process.hrtime(startTime);
        const timeInMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2); // e.g. "32.45"

        if (error) {
            console.error('Solver error (execFile error):', error);
            console.error('STDERR:', stderr);
            console.error('STDOUT:', stdout);
            return res.status(500).json({ error: 'Solver failed' });
        }

        fs.readFile('solution.json', 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Could not read solution' });
            }

            try {
                const solution = JSON.parse(data);
                return res.json({ moves: solution, timeMs: timeInMs });
            } catch (parseErr) {
                return res.status(500).json({ error: 'Invalid JSON output from solver' });
            }
        });
    });
});


app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
