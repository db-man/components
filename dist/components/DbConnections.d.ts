export type StorageType = {
    set: (k: string, v: string) => void;
    get: (k: string) => string | null;
};
/**
 * To save online db tables schema in the local db, then pages could load faster
 */
declare const DbConnections: ({ storage }: {
    storage: StorageType;
}) => import("react/jsx-runtime").JSX.Element;
export default DbConnections;
//# sourceMappingURL=DbConnections.d.ts.map