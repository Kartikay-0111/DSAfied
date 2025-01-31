import mongoose from "mongoose";
import {MCQ} from "../models/mcq.js";
const connectDB = (url) =>{
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
    .then(()=> {
        console.log("database connected")
    })
    .catch((e)=>{console.log("Database connection failed:", e.message)});
}
// const mcqData =[
//     {
//       "question": "What is the time complexity of finding an element in a balanced Binary Search Tree?",
//       "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
//       "correctOption": 1,
//       "explanation": "In a balanced BST, each comparison eliminates half of the remaining nodes, resulting in a logarithmic O(log n) time complexity."
//     },
//     {
//       "question": "In the context of recursion, what prevents a stack overflow error?",
//       "options": ["Using a loop instead", "Having a base case", "Using more memory", "Increasing stack size"],
//       "correctOption": 1,
//       "explanation": "A base case is crucial in recursion as it provides a condition to stop the recursive calls."
//     },
//     {
//       "question": "Which data structure would be most efficient for implementing a cache with a fixed size where least recently used items are removed first?",
//       "options": ["Array", "Binary Tree", "Hash Map with Doubly Linked List", "Stack"],
//       "correctOption": 2,
//       "explanation": "A Hash Map combined with a Doubly Linked List (LRU Cache implementation) provides O(1) access time and efficient removal of least recently used items."
//     },
//     {
//       "question": "What is the space complexity of Quick Sort in its standard implementation?",
//       "options": ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
//       "correctOption": 1,
//       "explanation": "Quick Sort has a space complexity of O(log n) due to the recursive call stack."
//     },
//     {
//       "question": "Which sorting algorithm is considered the fastest on average for large datasets?",
//       "options": ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
//       "correctOption": 2,
//       "explanation": "Quick Sort is considered the fastest on average for large datasets due to its O(n log n) average time complexity."
//     },
//     {
//       "question": "What does the Big-O notation O(n!) represent?",
//       "options": ["Polynomial time", "Exponential time", "Factorial time", "Logarithmic time"],
//       "correctOption": 2,
//       "explanation": "O(n!) represents factorial time complexity, which grows extremely fast as n increases."
//     },
//     {
//       "question": "Which data structure is best for implementing a priority queue?",
//       "options": ["Stack", "Queue", "Heap", "Linked List"],
//       "correctOption": 2,
//       "explanation": "A Heap is the most efficient data structure for implementing a priority queue."
//     },
//     {
//       "question": "Which algorithm is used to detect cycles in a graph?",
//       "options": ["Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Bellman-Ford Algorithm", "Tarjan’s Algorithm"],
//       "correctOption": 3,
//       "explanation": "Tarjan’s Algorithm is commonly used for detecting cycles in a directed graph using DFS."
//     }
//   ]; // Paste the JSON array above here
  
// const db = mongoose.connection;
// db.collection("mcqs").insertMany(mcqData)
// .then(() => {
//   console.log("MCQs inserted successfully");
//   mongoose.connection.close(); // Close connection after inserting
// })
// .catch(err => console.error("Error inserting MCQs:", err));
  
export default connectDB;