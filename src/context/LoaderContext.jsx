import { createContext, useContext, useState } from 'react';

import GlobalLoader from '../components/PageLoader';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
            <GlobalLoader show={loading} />
        </LoaderContext.Provider>
    );
}

export const useLoader = () => {
    return useContext(LoaderContext);
}
