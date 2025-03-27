const allMoves = [
    "L", "L'", "L2", "R", "R'", "R2", "U", "U'", "U2",
    "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"
];

// Generate move buttons
const moveButtonsContainer = document.getElementById('moveButtons');
allMoves.forEach(move => {
    const btn = document.createElement('button');
    btn.textContent = move;
    btn.onclick = () => addMoveToInput(move);
    moveButtonsContainer.appendChild(btn);
});

function addMoveToInput(move) {
    const input = document.getElementById('scramble');
    const currentMoves = input.value.trim() === '' ? [] : input.value.trim().split(/\s+/);

    if (currentMoves.length >= 11) {
        alert("Max 11 moves allowed.");
        return;
    }

    currentMoves.push(move);
    input.value = currentMoves.join(' ');
    updateMoveCount(currentMoves.length);
}


// Solve button logic
document.getElementById('solveBtn').addEventListener('click', async () => {
    const scramble = document.getElementById('scramble').value.trim();
    const solver = document.getElementById('solverSelect').value;
    const model = document.getElementById('modelSelect').value;
    if (!scramble) return alert("Enter a scramble.");

    // 🧹 Clear previous output
    const summary = document.getElementById('solutionSummary');
    const display = document.getElementById('solutionDisplay');
    summary.style.display = 'none';
    summary.innerHTML = '';

    display.style.display = 'none';
    display.innerHTML = '';

    // ⏳ Show loader
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const solveBtn = document.getElementById('solveBtn');
    solveBtn.disabled = true;
    solveBtn.textContent = "Solving...";

    try {
        const res = await fetch('/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scramble, solver, model })
        });

        const data = await res.json();
        const { moves, timeMs } = data;

        typeSolution(moves);
        showSummary(moves, solver, model, timeMs);
        showKnowledge(solver, model, moves.length);
    } catch (err) {
        alert("An error occurred while solving.");
        console.error(err);
    } finally {
        loader.style.display = 'none';
        solveBtn.disabled = false;
        solveBtn.textContent = "Solve Cube";
    }
});
function typeWriterHTML(element, html, speed = 25, callback = null) {
    element.style.display = 'block';
    element.innerHTML = '';

    // Split by characters *but preserve HTML tags*
    let i = 0;
    let inTag = false;
    let tagBuffer = '';
    let output = '';

    function type() {
        if (i >= html.length) {
            if (callback) callback();
            return;
        }

        const char = html[i];

        if (char === '<') {
            inTag = true;
        }

        if (inTag) {
            tagBuffer += char;
            if (char === '>') {
                output += tagBuffer;
                element.innerHTML = output;
                tagBuffer = '';
                inTag = false;
            }
        } else {
            output += char;
            element.innerHTML = output;
        }

        i++;
        setTimeout(type, speed);
    }

    type();
}


function typeSolution(moves) {
    const display = document.getElementById('solutionDisplay');
    display.style.display = 'block';  // ← make it visible

    display.innerHTML = "<strong>Solution:</strong><br>";
    let i = 0;
    const interval = setInterval(() => {
        if (i < moves.length) {
            display.innerHTML += moves[i] + " ";
            i++;
        } else {
            clearInterval(interval);
        }
    }, 150);
}
const solverMap = {
    ida: "IDA*",
    bfs: "Breadth-First Search",
    dfs: "Depth-First Search",
    iddfs: "Iterative Deepening DFS"
};

const modelMap = {
    bitboard: "Bitboard",
    array1d: "1D Array",
    array3d: "3D Array"
};

function showSummary(moves, solver, model, timeMs) {
    const summary = document.getElementById('solutionSummary');

    const solverMap = {
        ida: "IDA*",
        bfs: "Breadth-First Search",
        dfs: "Depth-First Search",
        iddfs: "Iterative Deepening DFS"
    };

    const modelMap = {
        bitboard: "Bitboard",
        array1d: "1D Array",
        array3d: "3D Array"
    };

    const summaryText = `
        Summary:
        Total Moves: ${moves.length}
        Solver: ${solverMap[solver] || solver}
        Model: ${modelMap[model] || model}
        Execution Time: ${timeMs} ms
        Time: ${new Date().toLocaleTimeString()}
        `.trim();

    typeWriterHTML(summary, knowledgeText, 25);
}



document.getElementById('scramble').addEventListener('input', () => {
    const moves = document.getElementById('scramble').value.trim();
    const moveCount = moves === '' ? 0 : moves.split(/\s+/).length;
    if (moveCount > 11) {
        // Trim it down to max 11
        const trimmed = moves.split(/\s+/).slice(0, 11).join(' ');
        document.getElementById('scramble').value = trimmed;
        updateMoveCount(11);
    } else {
        updateMoveCount(moveCount);
    }
});
function updateMoveCount(count) {
    const display = document.getElementById('moveCount');
    display.textContent = `Moves used: ${count} / 11`;
}

document.getElementById('resetBtn').addEventListener('click', () => {
    // Clear scramble
    document.getElementById('scramble').value = '';

    // Reset move count
    updateMoveCount(0);

    // Hide output
    document.getElementById('solutionSummary').style.display = 'none';
    document.getElementById('solutionSummary').innerHTML = '';

    document.getElementById('solutionDisplay').style.display = 'none';
    document.getElementById('solutionDisplay').innerHTML = '';

    // Optional: Reset dropdowns to default
    document.getElementById('solverSelect').selectedIndex = 0;
    document.getElementById('modelSelect').selectedIndex = 0;
});
function showKnowledge(solver, model, moveCount) {
    const box = document.getElementById('knowledgeBox');
    box.style.display = 'block';
    box.innerHTML = ''; // Clear previous content

    const solverInfo = {
        ida: "IDA* (Iterative Deepening A*) uses heuristics to find optimal solutions efficiently. It’s memory efficient and guaranteed to find the shortest path.",
        bfs: "Breadth-First Search explores all possibilities level by level. It guarantees optimality but consumes a lot of memory for complex scrambles.",
        dfs: "Depth-First Search goes deep first. It's fast for shallow solutions but doesn't guarantee optimality or even termination without depth limits.",
        iddfs: "IDDFS combines DFS and BFS. It performs repeated DFS to increasing depths, balancing memory usage and completeness."
    };

    const modelInfo = {
        bitboard: "Bitboard uses compact binary encoding to represent cube states. It’s highly optimized for speed and memory — great for serious solvers.",
        array1d: "1D Array represents the cube as a flat array of facelets. It’s a good balance of speed and simplicity.",
        array3d: "3D Array mimics the physical cube layout using a 3D matrix. It’s intuitive and easy to debug, but slower for complex searches."
    };

    const trivia = "💡 Fun Fact: 20 is the maximum number of moves required to solve any 3x3 cube optimally — this is called God's Number.";

    const fullText = `
      <strong>Solver Insight:</strong><br>${solverInfo[solver] || ''}<br><br>
      <strong>Model Insight:</strong><br>${modelInfo[model] || ''}<br><br>
      <strong>Trivia:</strong><br>${trivia}
        `.trim();


    typeWriterHTML(box, fullText, 20); // Speed: 20ms per character
}
