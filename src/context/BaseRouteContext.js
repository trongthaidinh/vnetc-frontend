import React, { createContext, useContext } from 'react';

const BaseRouteContext = createContext();

export const useBaseRoute = () => {
    return useContext(BaseRouteContext);
};

export const BaseRouteProvider = ({ baseRoute, children }) => {
    return <BaseRouteContext.Provider value={baseRoute}>{children}</BaseRouteContext.Provider>;
};
