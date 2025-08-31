import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';
import ListUsers from '../src/views/users/ListUsers';
import ListRoles from '../src/views/roles/ListRoles';

const Router = () => {
    return (
        <Routes>
            <Route key="index" path="/" element={<Index />} />
            <Route key="users" path="/users" element={<ListUsers />} />
            <Route key="roles" path="/roles" element={<ListRoles />} />
        </Routes>
    );
}

export default Router;