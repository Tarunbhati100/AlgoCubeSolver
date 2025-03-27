const allMoves = [
    "L", "L'", "L2", "R", "R'", "R2", "U", "U'", "U2",
    "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"
];
const allMovesSet = new Set(allMoves);

function animateSolutionOnCube(moves) {
    const cube = document.getElementById('cubePlayer');
    const slicecube = document.getElementById('sliceViewer');
    if (!cube || typeof moves !== 'string') return;

    const cleaned = moves.trim().replace(/\s+/g, ' ');

    // Reset to a known solved state if empty
    const alg = cleaned === '' ? "x x'" : cleaned; // ✅ dummy move pair to trigger reset

    // Restart animation
    cube.setAttribute('alg', '');
    setTimeout(() => {
        cube.setAttribute('alg', alg);
        slicecube.setAttribute('alg', alg);
    }, 50);
}


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

    if (currentMoves.length >= 12) {
        alert("Max 12 moves allowed.");
        return;
    }

    currentMoves.push(move);
    input.value = currentMoves.join(' ');
    updateMoveCount(currentMoves.length);
    input.dispatchEvent(new Event('input'));
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

        if (!res.ok) {
            const text = await res.text(); // try to read error message
            throw new Error(`Server returned ${res.status}: ${text}`);
        }

        const data = await res.json();
        const { moves, timeMs } = data;

        if (!moves || !Array.isArray(moves)) {
            throw new Error("Invalid or missing moves from server");
        }

        animateSolutionOnCube(scramble+moves.join(' '));
        typeSolution(moves);
        showSummary(moves, solver, model, timeMs);
        showKnowledge(solver, model, moves.length);
    } catch (err) {
        alert("An error occurred while solving.");
        console.error("Solve error:", err);
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
        <strong>Summary:</strong><br>
        Total Moves: ${moves.length}<br>
        Solver: ${solverMap[solver] || solver}<br>
        Model: ${modelMap[model] || model}<br>
        Execution Time: ${timeMs} ms<br>
        Time: ${new Date().toLocaleTimeString()}
        `.trim();


    typeWriterHTML(summary, summaryText, 25);
}

let cubeTimeout = null; // ✅ persist across function calls

document.getElementById('scramble').addEventListener('input', () => {
    const inputElem = document.getElementById('scramble');
    const moves = inputElem.value.trim();
    const moveCount = moves === '' ? 0 : moves.split(/\s+/).length;
    if (moveCount > 12) {
        const trimmed = moves.split(/\s+/).slice(0, 12).join(' ');
        inputElem.value = trimmed;
        updateMoveCount(12);
        return;
    }

    updateMoveCount(moveCount);

    clearTimeout(cubeTimeout);
    cubeTimeout = setTimeout(() => {
        const cleaned = inputElem.value.trim().replace(/\s+/g, ' ');
        const moveList = cleaned === '' ? [] : cleaned.split(' ');

// ✅ Validate
        const isValid = moveList.length === 0 || moveList.every(move => allMovesSet.has(move));

        if (!isValid) return; // Don't animate invalid input

        animateSolutionOnCube(cleaned);
    }, 300);
});


function updateMoveCount(count) {
    const display = document.getElementById('moveCount');
    display.textContent = `Moves used: ${count} / 12`;
}

document.getElementById('resetBtn').addEventListener('click', () => {
    // Clear scramble
    let input = document.getElementById('scramble');
    input.value = '';

    // Reset move count
    updateMoveCount(0);

    // Hide output
    document.getElementById('solutionSummary').style.display = 'none';
    document.getElementById('solutionSummary').innerHTML = '';

    document.getElementById('solutionDisplay').style.display = 'none';
    document.getElementById('solutionDisplay').innerHTML = '';
    document.getElementById('knowledgeBox').style.display = 'none';
    document.getElementById('knowledgeBox').innerHTML = '';

    // Optional: Reset dropdowns to default
    document.getElementById('solverSelect').selectedIndex = 0;
    document.getElementById('modelSelect').selectedIndex = 0;
    input.dispatchEvent(new Event('input'));
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

    // ✅ No typewriter — render instantly
    box.innerHTML = fullText;
}

