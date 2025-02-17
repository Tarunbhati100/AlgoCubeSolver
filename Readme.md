# 🚀 AlgoCubeSolver – Using Korf’s IDA* Algorithm

AlgoCubeSolver is a C++ project that efficiently models and solves a **3x3 Rubik’s Cube** using multiple search algorithms, achieving fast and optimal solutions. The solver effectively reduces solve times, achieving **sub-3-second** solutions for simpler scrambles and **under 10 seconds** for complex ones using **Korf’s IDA*** algorithm.

---
## 🌟 Features

✔️ **Virtual 3x3 Rubik’s Cube Simulation** – Modeled in **3 different class structures** using standard C++ data structures.  
✔️ **Advanced Search Algorithms** – Implements multiple solving strategies:
- 🔍 **BFS (Breadth-First Search)**
- 🔍 **DFS (Depth-First Search)**
- 🔍 **IDDFS (Iterative Deepening Depth-First Search)**
- 🚀 **IDA*** (Iterative Deepening A* Search)  
  ✔️ **Optimized Performance** – Solves a Rubik’s Cube **jumbled 8 times** in **under 3 seconds** and a **13-move scrambled cube** in **under 10 seconds** using **Korf’s IDA*** algorithm.

---
## 🛠️ Getting Started

### 📌 Prerequisites
- 🔧 **C++ Compiler** – Supports C++11 or later.
- ⚙️ **Build Tools** – Optional [CMake](https://cmake.org/) for an easier build process.

### 📥 Installation

1️⃣ **Clone the Repository**:

```bash
git clone https://github.com/Tarunbhati100/AlgoCubeSolver.git
cd AlgoCubeSolver
```

2️⃣ **Build the Project**:

```bash
mkdir build
cd build
cmake ..
make
```

### ▶️ Running the Solver

After building, execute the solver:

```bash
./AlgoCubeSolver
```

Follow on-screen instructions to input a scrambled cube state and see the optimized solution in action! 🎯

---
## 📂 Code Structure

📌 **Cube Class** – Represents the Rubik’s Cube and supports state manipulation.  
📌 **Solver Module** – Implements **BFS, DFS, IDDFS, and IDA*** algorithms to find optimal solutions.  
📌 **Main Program (main.cpp)** – Integrates the cube model and solver logic.

---
## 🧩 Algorithms

🔹 **BFS (Breadth-First Search)** – Explores cube states level-by-level for systematic solving.  
🔹 **DFS (Depth-First Search)** – Explores deep state branches sequentially.  
🔹 **IDDFS (Iterative Deepening DFS)** – Merges BFS completeness with DFS memory efficiency.  
🔹 **IDA* (Iterative Deepening A* Search)** – Uses heuristic-guided search for **faster, optimal solutions**, reducing search depth significantly.
---

