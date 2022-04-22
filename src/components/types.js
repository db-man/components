import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const linkShape = {
  children: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
};

export const link = PropTypes.shape(linkShape);
