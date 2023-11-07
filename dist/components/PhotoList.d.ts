import PropTypes from "prop-types";
export type PhotoType = {
    url: string;
    imgSrc: string;
    description: string;
};
declare const PhotoList: {
    ({ photos }: {
        photos: PhotoType[];
    }): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        photos: PropTypes.Requireable<(PropTypes.InferProps<{
            url: PropTypes.Validator<string>;
            imgSrc: PropTypes.Validator<string>;
            description: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
    };
    defaultProps: {
        photos: never[];
    };
};
export default PhotoList;
//# sourceMappingURL=PhotoList.d.ts.map