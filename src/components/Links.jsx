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

export const Link = (props) => {
  if (props.children) {
    return (
      <a
        className="dm-dd-link"
        href={props.children}
        target="_blank"
        rel="noreferrer"
      >
        {props.children}
      </a>
    );
  }
  return (
    <a
      className="dm-dd-link"
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      {props.text}
    </a>
  );
};

export const Links = ({ links }) => (
  <div>
    {links &&
      links.map(({ href, text }, index) => (
        <Link key={index} href={href} text={text} />
      ))}
  </div>
);

export const Fragment = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export const ImageLinks = ({ imgs, limit = 3 }) => {
  if (!imgs) return null;

  let results = imgs;
  if (limit !== null) {
    results = imgs.slice(0, limit);
  }
  return results.map((img, index) => <ImageLink key={index} {...img} />);
};
