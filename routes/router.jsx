import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';

const Router = () => {
    return (
        <Routes>
            <Route key="index" path='/' element={<Index />} />
        </Routes>
    );
}

export default Router;