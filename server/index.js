import express, { json } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import articleRoute from './routes/article.routes.js';
import problemRoutes from './routes/problem.routes.js';
import connectDB from './database/connect.js';
import jwtCheck from './middleware/jwtcheck.js';
import { Daily } from './models/daily.js';
import { Problem } from './models/problem.js';
import { User } from './models/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials
  allowedHeaders: ['Authorization', 'Content-Type']  // Allow Authorization header
  
}));

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});

app.post('/api/check-solved', async(req, res)=>{
  // const userid = req.params.id;
  // const user = await User.findById(userid);
  // const lc_handle = user.platforms['leetcode'];
  // const problemid = req.body.problemid;
  // const problem = await Problem.findOne({userid: userid, problemid: problemid});

  const {titleSlug} = req.body;
  console.log(titleSlug);

  const response = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb2NpYWxhY2NvdW50X3NvY2lhbGxvZ2luIjp7ImFjY291bnQiOnsiaWQiOm51bGwsInVzZXJfaWQiOm51bGwsInByb3ZpZGVyIjoiZ29vZ2xlIiwidWlkIjoiMTA4NTQzNjEwNDAyMDI5NzQ5MjMzIiwibGFzdF9sb2dpbiI6bnVsbCwiZGF0ZV9qb2luZWQiOm51bGwsImV4dHJhX2RhdGEiOnsiaWQiOiIxMDg1NDM2MTA0MDIwMjk3NDkyMzMiLCJlbWFpbCI6ImdhdXJhdmdhdXIwNTA0QGdtYWlsLmNvbSIsInZlcmlmaWVkX2VtYWlsIjp0cnVlLCJuYW1lIjoiR2F1cmF2IEdhdXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FMVi1ValY5NE4yU0pfTF9aUjMwWUJFa2x0dk9JdjZVaTFNMEdJWkRDQlFHS1FsaUQ3ZGQ0Zz1zOTYtYyJ9fSwidXNlciI6eyJpZCI6bnVsbCwicGFzc3dvcmQiOiIhWlNtSmxKa2Vsck9weXJlY2gyZ0FON1YySlh3Q2NtTW1wTGs4N0xQOSIsImxhc3RfbG9naW4iOm51bGwsImlzX3N1cGVydXNlciI6ZmFsc2UsInVzZXJuYW1lIjoiIiwiZmlyc3RfbmFtZSI6IiIsImxhc3RfbmFtZSI6IiIsImVtYWlsIjoiZ2F1cmF2Z2F1cjA1MDRAZ21haWwuY29tIiwiaXNfc3RhZmYiOmZhbHNlLCJpc19hY3RpdmUiOnRydWUsImRhdGVfam9pbmVkIjoiMjAyNS0wMS0xNlQxNDowNDo1MS42OTRaIn0sInN0YXRlIjp7Im5leHQiOiIvIiwicHJvY2VzcyI6ImxvZ2luIiwic2NvcGUiOiIiLCJhdXRoX3BhcmFtcyI6IiJ9LCJlbWFpbF9hZGRyZXNzZXMiOlt7ImlkIjpudWxsLCJ1c2VyX2lkIjpudWxsLCJlbWFpbCI6ImdhdXJhdmdhdXIwNTA0QGdtYWlsLmNvbSIsInZlcmlmaWVkIjp0cnVlLCJwcmltYXJ5Ijp0cnVlfV0sInRva2VuIjp7ImlkIjpudWxsLCJhcHBfaWQiOjEsImFjY291bnRfaWQiOm51bGwsInRva2VuIjoieWEyOS5hMEFSVzVtNzRhUjhsbzdJMUlOdUx5NVpaRFVxVHBnZ2xWWlo3d2lzNURzNE1lVmhOc3pKXzJEVlhVODd4R0RzcGJEZmlMc0hONnlTdDlnczQ5dkNhNEdnV3pVdmxJWjkzaU5xX0R1Z05KeXNLWkVMc1B0eDN0MExqZmxEOUNzRUJuQ0VNZlQteTJnUXMtSk0zUWszUjRBZS1GNlRaNTJhNGc4LXQ0YUNnWUtBZmtTQVJFU0ZRSEdYMk1pNTNaWDU2WXZHZHpYWDVfWnhPd2s2UTAxNzEiLCJ0b2tlbl9zZWNyZXQiOiIiLCJleHBpcmVzX2F0IjoiMjAyNS0wMS0xNlQxNTowNDo0OS41OTJaIn19LCJfYXV0aF91c2VyX2lkIjoiMTIzOTcyNDkiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJhbGxhdXRoLmFjY291bnQuYXV0aF9iYWNrZW5kcy5BdXRoZW50aWNhdGlvbkJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJmZDQ0NjBhODk4MjBmYzlhYzM1YTViMzdhOTBiYjk4MGNjOTEzZmJlMzA4MDBiZDExODk3YWQ2ZjQ2OTRkODJjIiwic2Vzc2lvbl91dWlkIjoiYzg1ZjYwYzUiLCJpZCI6MTIzOTcyNDksImVtYWlsIjoiZ2F1cmF2Z2F1cjA1MDRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJNaWdodFlndXkiLCJ1c2VyX3NsdWciOiJNaWdodFlndXkiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvYXZhdGFycy9hdmF0YXJfMTcwODAwOTA2Ni5wbmciLCJyZWZyZXNoZWRfYXQiOjE3MzcwMzYzMTcsImlwIjoiMTE1Ljk2LjIxOS4xNzYiLCJpZGVudGl0eSI6ImY1MWJiNDgyYzY2MGQwZWVhZGQxZjA1ODA1OGEyYjM1IiwiZGV2aWNlX3dpdGhfaXAiOlsiNjBiN2FmNWNiNDAxNDdmN2E0NzZkOTU1YWMxNGVkNTkiLCIxMTUuOTYuMjE5LjE3NiJdLCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.5ALkQaH8AAkW70oL1XdpCaaZkJU6abudAVrRBYQ1p-Q',
      'Referer': 'https://leetcode.com/',
    },
    body: JSON.stringify({
      "query" : `query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
            id
            title
            titleSlug
            timestamp
        }
    }`,
    variables:{
    "username":"kartikay7905",
    "limit":1
    }
    })

  })
  const data = await response.json();
  console.log(data.data);
  if(data.data.recentAcSubmissionList[0].titleSlug == titleSlug ){
    return res.status(200).json({solved: true});
  }
  res.status(404).json({solved:false});

});

app.use(jwtCheck);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/article', articleRoute);
app.use('/api', problemRoutes);
app.use('/api/problem', problemRoutes);



// Start Server
try{
    connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch(err){
  console.log(err);
}