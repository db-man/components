import React from 'react';
import PropTypes from 'prop-types';
import { PhotoType } from './PhotoList';
export declare function Fragment({ children }: {
    children: React.ReactNode;
}): React.ReactNode;
export declare function Link({ children, href, text, }: {
    children?: string;
    href?: string;
    text?: string;
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
export declare function Links({ links, }: {
    links: {
        href?: string;
        text?: string;
    }[];
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
    children?: string;
} & PhotoType): import("react/jsx-runtime").JSX.Element;
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
export declare function ImageLinks({ imgs, limit, }: {
    imgs: PhotoType[];
    limit?: number;
}): import("react/jsx-runtime").JSX.Element[] | null;
//# sourceMappingURL=Links.d.ts.map