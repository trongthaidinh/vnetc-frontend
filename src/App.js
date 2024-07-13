import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import LoadingScreen from '~/components/LoadingScreen';
import { AuthProvider, useAuth } from '~/hooks/useAuth';
import Login from '~/pages/Admin/Login';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout || DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <PrivateRoute>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    }
                                />
                            );
                        })}

                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}
function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    return user ? children : <Navigate to="/login" />;
}

export default App;
