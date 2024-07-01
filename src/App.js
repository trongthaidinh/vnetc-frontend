import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true); // State để quản lý hiển thị Loading

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Tắt màn hình Loading sau 2 giây (simulated)
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />; // Hiển thị màn hình Loading khi đang load dữ liệu
    }

    return (
        <Router>
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
