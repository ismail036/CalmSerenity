import React, { createContext, useState, ReactNode } from 'react';

interface BackgroundColorContextProps {
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
}

export const BackgroundColorContext = createContext<BackgroundColorContextProps>({
    backgroundColor: '#253334',
    setBackgroundColor: () => {},
});

export const BackgroundColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#253334');

    return (
        <BackgroundColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
            {children}
        </BackgroundColorContext.Provider>
    );
};
