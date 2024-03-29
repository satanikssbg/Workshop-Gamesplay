import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import Path from './paths';

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import GameList from './components/game-list/GameList';
import GameCreate from './components/game-create/GameCreate';
import Login from './components/login/login';
import Register from './components/register/Register';

import Logout from './components/logout/Logout';
import GameEdit from './components/game-edit/GameEdit';
import ErrorBoundary from './components/ErrorBoundary';
import BaseAuthGuard from './components/guards/BaseAuthGuard';
import AuthGuard from './components/guards/AuthGuard';
import UploadFirebase from './components/UploadFirebase';

const GameDetails = lazy(() => import('./components/game-details/GameDetails'));

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <div id="box">
                    <Header />

                    <Suspense fallback={<h1>Loading...</h1>}>
                        <Routes>
                            <Route path={Path.Home} element={<Home />} />
                            <Route path="/games" element={<GameList />} />

                            <Route path="/games/:gameId" element={<GameDetails />} />

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            <Route path='/upload' element={<UploadFirebase />} />


                            <Route element={<AuthGuard />}>
                                <Route path="/games/create" element={<GameCreate />} />
                                <Route path={Path.GameEdit} element={<GameEdit />} />
                                <Route path={Path.Logout} element={<Logout />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </div>
            </AuthProvider>
        </ErrorBoundary>
    );
};

export default App;