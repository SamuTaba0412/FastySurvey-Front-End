import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';
import ListUsers from '../src/views/users/ListUsers';

const Router = () => {
    return (
        <Routes>
            <Route key="index" path="/" element={<Index />} />
            <Route key="users" path="/users" element={<ListUsers />} />
        </Routes>
    );
}

export default Router;