import { Routes, Route } from 'react-router-dom';

import Index from '../src/views/Index';
import ListSurveys from '../src/views/surveys/ListSurveys';

const Router = () => {
    return (
        <Routes>
            <Route key="index" path="/" element={<Index />} />
            <Route key="surveys" path="/surveys" element={<ListSurveys />} />
        </Routes>
    );
}

export default Router;