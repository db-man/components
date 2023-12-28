export type CardTablePagination = {
    pageSize: number;
    current: number;
};
declare const ImageCardTable: ({ imgKey, dataSource, pagination, onChange, }: {
    imgKey?: string | undefined;
    dataSource: any[];
    pagination: CardTablePagination;
    onChange: (pagination: CardTablePagination) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default ImageCardTable;
//# sourceMappingURL=ImageCardTable.d.ts.map