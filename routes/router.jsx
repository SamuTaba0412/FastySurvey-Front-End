import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';
import ListUsers from '../src/views/users/ListUsers';
import ListSurveys from '../src/views/surveys/ListSurveys';

const Router = () => {
    return (
        <Routes>
            <Route key="index" path="/" element={<Index />} />
            <Route key="users" path="/users" element={<ListUsers />} />
            <Route key="surveys" path="/surveys" element={<ListSurveys />} />
        </Routes>
    );
}

export default Router;