import { createContext, useContext, useState } from 'react';
import GlobalLoader from '../components/PageLoader';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const startLoading = () => setLoadingCount(prev => prev + 1);
    const stopLoading = () => setLoadingCount(prev => Math.max(prev - 1, 0));

    return (
        <LoaderContext.Provider value={{ 
            loading: loadingCount > 0, 
            startLoading, 
            stopLoading 
        }}>
            {children}
            <GlobalLoader show={loadingCount > 0} />
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
