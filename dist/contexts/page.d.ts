import React from 'react';
import Column from '../types/Column';
export interface PageContextType {
    appModes: string[];
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