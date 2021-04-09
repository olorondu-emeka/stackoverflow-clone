import slugify from 'slugify';

/**
 *
 * @param {string} inputString input string to be slugify=ied
 * @returns {string} a slugified string
 */
function generateSlug(inputString: string): string {
  return slugify(inputString, '-');
}

export default generateSlug;
