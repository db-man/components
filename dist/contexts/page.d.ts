import React from 'react';
import DbColumn from '../types/DbColumn';
import Databases from '../types/Databases';
import { RowType } from '../types/Data';
export interface PageContextType {
    appModes: string[];
    dbs?: Databases;
    dbName: string;
    tableName: string;
    action: string;
    columns: DbColumn[];
    primaryKey: string;
    tables: string[];
    githubDb: {
        getTableRows: (dbName: string, tableName: string, signal?: AbortSignal) => Promise<{
            content: RowType[];
            sha: string;
        }>;
        updateTableFile: (dbName: string, tableName: string, content: RowType[], tableFileSha: string | null) => Promise<{
            commit: {
                html_url?: string;
            };
        }>;
        updateRecordFile: (dbName: string, tableName: string, recordId: string, content: RowType, recordFileSha: string | null) => Promise<{
            commit: {
                html_url?: string;
            };
        }>;
        getDataUrl: (dbName: string, tableName: string) => string;
        getRecordFileContentAndSha: (dbName: string, tableName: string, recordId: string, signal?: AbortSignal) => Promise<{
            content: RowType;
            sha: string;
        }>;
        getGitHubFullPath: (path: string) => string;
        getDataPath: (dbName: string, tableName: string) => string;
        deleteRecordFile: (dbName: string, tableName: string, recordId: string, recordFileSha: string | null) => Promise<{
            commit: {
                html_url?: string;
            };
        }>;
    } | null;
}
declare const PageContext: React.Context<PageContextType>;
export default PageContext;
//# sourceMappingURL=page.d.ts.map