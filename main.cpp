//
// Created by Tarun Bhati on 17-08-2024.
//

#include <bits/stdc++.h>
#include "Model/RubiksCube3dArray.cpp"
#include "Model/RubiksCube1dArray.cpp"
//#include "Model/RubiksCubeBitboard.cpp"
#include "Solver/DFSSolver.h"
#include "Solver/BFSSolver.h"
#include "Solver/IDDFSSolver.h"
#include "Solver/IDAstarSolver.h"
//#include "PatternDatabases/CornerPatternDatabase.h"
#include "PatternDatabases/CornerDBMaker.h"

using namespace std;

int main(int argc, char* argv[]) {
//    RubiksCube3dArray object3DArray;
//    RubiksCube1dArray object1dArray;
//    RubiksCubeBitboard objectBitboard;
//
//    object3DArray.print();
//
//    if (object3DArray.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    if (object1dArray.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    if (objectBitboard.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    objectBitboard.u();
//    object3DArray.u();
//    object1dArray.u();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.l();
//    object3DArray.l();
//    object1dArray.l();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.f();
//    object3DArray.f();
//    object1dArray.f();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.r();
//    object3DArray.r();
//    object1dArray.r();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.b();
//    object3DArray.b();
//    object1dArray.b();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.d();
//    object3DArray.d();
//    object1dArray.d();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    if (object3DArray.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    if (object1dArray.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    if (objectBitboard.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    objectBitboard.dPrime();
//    object3DArray.dPrime();
//    object1dArray.dPrime();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.bPrime();
//    object3DArray.bPrime();
//    object1dArray.bPrime();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.rPrime();
//    object3DArray.rPrime();
//    object1dArray.rPrime();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.fPrime();
//    object3DArray.fPrime();
//    object1dArray.fPrime();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.lPrime();
//    object3DArray.lPrime();
//    object1dArray.lPrime();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    objectBitboard.uPrime();
//    object3DArray.uPrime();
//    object1dArray.uPrime();
//    objectBitboard.print();
//    object3DArray.print();
//    object1dArray.print();
//
//    if (object3DArray.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    if (object1dArray.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";
//
//    if (objectBitboard.isSolved()) cout << "SOLVED\n\n";
//    else cout << "NOT SOLVED\n\n";

    // Create two Cubes ------------------------------------------------------------------------------------------

//    RubiksCube3dArray cube1;
//    RubiksCube3dArray cube2;

//    RubiksCube1dArray cube1;
//    RubiksCube1dArray cube2;

//    RubiksCubeBitboard cube1;
//    RubiksCubeBitboard cube2;


//  Equality and assignment of cubes --------------------------------------------------------------------------

//    if(cube1 == cube2) cout << "Is equal\n";
//    else cout << "Not Equal\n";
//
//    cube1.randomShuffleCube(1);
//
//    if(cube1 == cube2) cout << "Is equal\n";
//    else cout << "Not Equal\n";
//
//    cube2 = cube1;
//
//    if(cube1 == cube2) cout << "Is equal\n";
//    else cout << "Not Equal\n";


//  Unordered_map of Cubes  ------------------------------------------------------------------------------------


//    unordered_map<RubiksCube3dArray, bool, Hash3d> mp1;

//    unordered_map<RubiksCube1dArray, bool, Hash1d> mp1;

//    unordered_map<RubiksCubeBitboard, bool, HashBitboard> mp1;
//
//    mp1[cube1] = true;
//    cube2.randomShuffleCube(8);
//    if (mp1[cube1]) cout << "Cube1 is present\n";
//    else cout << "Cube1 is not present\n";
//
//    if (mp1[cube2]) cout << "Cube2 is present\n";
//    else cout << "Cube2 is not present\n";
//

// DFS Solver Testing __________________________________________________________________________________________
//    RubiksCube3dArray cube;
//    cube.print();
//
//    vector<RubiksCube::MOVE> shuffle_moves = cube.randomShuffleCube(6);
//    for (auto move: shuffle_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    cube.print();
//
//    DFSSolver<RubiksCube3dArray, Hash3d> dfsSolver(cube, 8);
//    vector<RubiksCube::MOVE> solve_moves = dfsSolver.solve();
//
//    for (auto move: solve_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    dfsSolver.rubiksCube.print();


//BFS Solver -----------------------------------------------------------------------------------------------------
//    RubiksCubeBitboard cube;
//    cube.print();
//
//    vector<RubiksCube::MOVE> shuffle_moves = cube.randomShuffleCube(6);
//    for(auto move: shuffle_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    cube.print();
//
//    BFSSolver<RubiksCubeBitboard, HashBitboard> bfsSolver(cube);
//    vector<RubiksCube::MOVE> solve_moves = bfsSolver.solve();
//
//    for(auto move: solve_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    bfsSolver.rubiksCube.print();

// IDDFS Solver ----------------------------------------------------------------------------------------------------
//    RubiksCubeBitboard cube;
//    cube.print();
//
//    vector<RubiksCube::MOVE> shuffle_moves = cube.randomShuffleCube(7);
//    for (auto move: shuffle_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    cube.print();
//
//    IDDFSSolver<RubiksCubeBitboard, HashBitboard> iddfsSolver(cube, 7);
//    vector<RubiksCube::MOVE> solve_moves = iddfsSolver.solve();
//
//    for (auto move: solve_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    iddfsSolver.rubiksCube.print();

// IDA* SOLVER ---------------------------------------------------------------------------------------------------
//    RubiksCubeBitboard cube;
//    cube.print();
//
//    vector<RubiksCube::MOVE> shuffle_moves = cube.randomShuffleCube(5);
//    for (auto move: shuffle_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    cube.print();
//
//    IDAstarSolver<RubiksCubeBitboard, HashBitboard> idAstarSolver(cube);
//    vector<RubiksCube::MOVE> solve_moves = idAstarSolver.solve();
//    for (auto move: solve_moves) cout << cube.getMove(move) << " ";
//    cout << "\n";
//    idAstarSolver.rubiksCube.print();

// CornerPatternDatabase Testing ---------------------------------------------------------------------------------

//    CornerPatternDatabase cornerDB;
//    RubiksCubeBitboard cube;
//    cube.print();
//
//    cout << (int)cornerDB.getNumMoves(cube) << "\n";
//
//    cornerDB.setNumMoves(cube, 5);
//
//    cout << (int)cornerDB.getNumMoves(cube) << "\n";
//
//    cube.randomShuffleCube(1);
//    cube.print();
//    cout << (int)cornerDB.getNumMoves(cube) << "\n";
//
//    cornerDB.setNumMoves(cube, 6);
//
//    cout << (int)cornerDB.getNumMoves(cube) << "\n";


    if (argc < 4) {
        cerr << "Usage: " << argv[0] << " \"<scramble>\" <solver> <model>\n";
        return 1;
    }

    string scramble = argv[1];
    string solver = argv[2];
    string model = argv[3];

    RubiksCube* cube = nullptr;
    string heuristicFile = "Databases/cornerDepth5V1.txt";

    // Instantiate model
    if (model == "bitboard") cube = new RubiksCubeBitboard();
    else if (model == "array1d") cube = new RubiksCube1dArray();
    else if (model == "array3d") cube = new RubiksCube3dArray();
    else {
        cerr << "Invalid model: " << model << "\n";
        return 1;
    }

    // Parse scramble
    istringstream iss(scramble);
    string moveStr;
    while (iss >> moveStr) {
        try {
            cube->move(cube->parseMove(moveStr));
        } catch (const exception& e) {
            cerr << "Error parsing move: " << e.what() << "\n";
            return 1;
        }
    }

    // Solve
    vector<RubiksCube::MOVE> solution;
    if (solver == "ida") {
        if (model == "bitboard")
            solution = IDAstarSolver<RubiksCubeBitboard, HashBitboard>(*dynamic_cast<RubiksCubeBitboard*>(cube), heuristicFile).solve();
        else if (model == "array1d")
            solution = IDAstarSolver<RubiksCube1dArray, Hash1d>(*dynamic_cast<RubiksCube1dArray*>(cube), heuristicFile).solve();
        else
            solution = IDAstarSolver<RubiksCube3dArray, Hash3d>(*dynamic_cast<RubiksCube3dArray*>(cube), heuristicFile).solve();
    } else if (solver == "dfs") {
        if (model == "bitboard")
            solution = DFSSolver<RubiksCubeBitboard, HashBitboard>(*dynamic_cast<RubiksCubeBitboard*>(cube), 13).solve();
        else if (model == "array1d")
            solution = DFSSolver<RubiksCube1dArray, Hash1d>(*dynamic_cast<RubiksCube1dArray*>(cube), 13).solve();
        else
            solution = DFSSolver<RubiksCube3dArray, Hash3d>(*dynamic_cast<RubiksCube3dArray*>(cube), 13).solve();
    } else if (solver == "bfs") {
        if (model == "bitboard")
            solution = BFSSolver<RubiksCubeBitboard, HashBitboard>(*dynamic_cast<RubiksCubeBitboard*>(cube)).solve();
        else if (model == "array1d")
            solution = BFSSolver<RubiksCube1dArray, Hash1d>(*dynamic_cast<RubiksCube1dArray*>(cube)).solve();
        else
            solution = BFSSolver<RubiksCube3dArray, Hash3d>(*dynamic_cast<RubiksCube3dArray*>(cube)).solve();
    } else if (solver == "iddfs") {
        if (model == "bitboard")
            solution = IDDFSSolver<RubiksCubeBitboard, HashBitboard>(*dynamic_cast<RubiksCubeBitboard*>(cube), 13).solve();
        else if (model == "array1d")
            solution = IDDFSSolver<RubiksCube1dArray, Hash1d>(*dynamic_cast<RubiksCube1dArray*>(cube), 13).solve();
        else
            solution = IDDFSSolver<RubiksCube3dArray, Hash3d>(*dynamic_cast<RubiksCube3dArray*>(cube), 13).solve();
    } else {
        cerr << "Invalid solver: " << solver << "\n";
        return 1;
    }
    return 0;
}