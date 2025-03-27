FROM gcc:9

# Add your source files into the image (if needed)
WORKDIR /app
COPY . .

# Build your solver
RUN g++ -std=c++17 -O2 -o /app/AlgoCubeSolver *.cpp Model/*.cpp PatternDatabases/*.cpp

