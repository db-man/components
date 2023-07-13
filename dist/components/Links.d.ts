import PropTypes from 'prop-types';
export declare function Fragment(props: any): any;
export declare function Link({ children, href, text }: {
    children: any;
    href: any;
    text: any;
}): import("react/jsx-runtime").JSX.Element;
export declare namespace Link {
    var propTypes: {
        children: PropTypes.Requireable<string>;
        href: PropTypes.Requireable<string>;
        text: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        children: string;
        href: string;
        text: string;
    };
}
export declare function Links({ links }: {
    links: any;
}): import("react/jsx-runtime").JSX.Element;
export declare namespace Links {
    var propTypes: {
        links: PropTypes.Requireable<(PropTypes.InferProps<{
            children: PropTypes.Requireable<string>;
            href: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
    };
    var defaultProps: {
        links: never[];
    };
}
/**
 * @param {string|string[]|undefined} props.description
 * @returns
 */
export declare function ImageLink({ children, url, imgSrc, description, }: {
    children: any;
    url: any;
    imgSrc: any;
    description: any;
}): import("react/jsx-runtime").JSX.Element;
export declare namespace ImageLink {
    var propTypes: {
        children: PropTypes.Requireable<string>;
        url: PropTypes.Requireable<string>;
        imgSrc: PropTypes.Requireable<string>;
        description: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        children: string;
        url: string;
        imgSrc: string;
        description: string;
    };
}
export declare function ImageLinks({ imgs, limit }: {
    imgs: any;
    limit?: number | undefined;
}): any;
