import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';
import ListSurveys from '../src/views/surveys/ListSurveys';
import StructurationSurveys from '../src/views/surveys/StructurationSurveys';


const Router = () => {
    return (
        <Routes>
            <Route key="index" path="/" element={<Index />} />
            <Route key="surveys" path="/surveys" element={<ListSurveys />} />
            <Route key="surveys/structuration" path="/surveys/structuration/:id" element={<StructurationSurveys />} />
            <Route key="users" path="/users" element={<ListUsers />} />
            <Route key="roles" path="/roles" element={<ListRoles />} />
        </Routes>
    );
}

export default Router;