import React from 'react';
import Databases from '../types/Databases';
export interface AppContextProps {
    dbs: Databases;
}
export declare const AppContext: React.Context<AppContextProps | null>;
export declare const useAppContext: () => AppContextProps;
//# sourceMappingURL=AppContext.d.ts.map