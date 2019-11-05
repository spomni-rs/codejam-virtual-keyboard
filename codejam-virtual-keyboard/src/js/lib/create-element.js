const is = require('./is');

/** Create an instance of HTMLElement by tagName and set its some properties.
 * This function can't proccess non primitive properties.
 *
 * @param {string} tagName
 * @param {string} [className]
 * @param {Object} [attrs]
*/
module.exports = function createElement(tagName, className, attrs) {
  if (!attrs && is.object(className)) {
    className = null; // eslint-disable-line no-param-reassign
    attrs = className; // eslint-disable-line no-param-reassign
  }

  const node = document.createElement(tagName);

  if (attrs) {
    Object.keys(attrs).forEach((attrName) => {
      const value = attrs[attrName];

      if (!is.primitive(value)) {
        throw new Error('Unable to proccess non promitive value.');
      }

      node[attrName] = value;
    });
  }

  if (className) node.classList.add(className);

  return node;
};
