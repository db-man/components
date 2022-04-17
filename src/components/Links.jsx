import React from "react";

/**
 * @param {string|string[]|undefined} props.description
 * @returns
 */
export const ImageLink = ({ url, imgSrc, description = null }) => (
  <div>
    <a className="dm-dd-image-link" href={url} rel="noreferrer" target="_blank">
      <span>{url}</span>
      <img alt="ImageLink" src={imgSrc} />
    </a>
    <br />
    {description}
  </div>
);

export const Link = ({ href, text }) => (
  <a className="dm-dd-link" href={href} target="_blank" rel="noreferrer">
    {text}
  </a>
);

export const Links = ({ links }) => (
  <div>
    {links &&
      links.map(({ href, text }, index) => (
        <Link key={index} href={href} text={text} />
      ))}
  </div>
);
