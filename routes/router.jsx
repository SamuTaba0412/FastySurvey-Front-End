import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';
import ListRoles from '../src/views/roles/ListRoles';

const Router = () => {
    return (
        <Routes>
            <Route key="index" path="/" element={<Index />} />
            <Route key="roles" path="/roles" element={<ListRoles />} />
        </Routes>
    );
}

export default Router;