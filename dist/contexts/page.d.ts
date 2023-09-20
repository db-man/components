import React from 'react';
import Column from '../types/Column';
import Databases from '../types/Databases';
export interface PageContextType {
    appModes: string[];
    dbs: Databases;
    dbName: string;
    tableName: string;
    action: string;
    columns: Column[];
    primaryKey: string;
    tables: string[];
    githubDb: any;
}
declare const PageContext: React.Context<PageContextType>;
export default PageContext;
//# sourceMappingURL=page.d.ts.map