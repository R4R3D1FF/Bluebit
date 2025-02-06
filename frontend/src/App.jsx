import './App.css'
import {PostCards} from './components/postCards.jsx';
import { CommentCards } from './components/commentCards.jsx';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useParams
} from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import { Subreddit } from './components/subreddit.jsx';
import PostForm from './components/postForm.jsx';
import LoginForm from './pages/loginPage.jsx';
import RedditPageClone from './components/gptPage.jsx';
import { User } from './components/user.jsx';



function CommentCardsWrapper() {
  const { postid } = useParams();
  return <CommentCards postid={postid} />
}

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        
        <Route index element={<PostCards/>} />
        <Route path='/r/:subname/:mode/' element={<Subreddit/>} />
        <Route path='/r/:subname/' element={<Subreddit/>} />
        <Route path='/r/:subname/comments/:postid/' element={<CommentCardsWrapper/>} />
        <Route path='/r/:subname/submit/' element={<PostForm/>} />

        <Route path='/u/:username/:mode/' element={<User/>} />
        <Route path='/u/:username/' element={<User/>} />
        <Route path='/u/:username/comments/:postid/' element={<CommentCardsWrapper/>} />
        <Route path='/u/:username/submit/' element={<User/>} />

        <Route path='/login/' element={<LoginForm/>} />
        <Route path='/gpt/' element={<RedditPageClone/>} />

        {/* <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} /> */}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
