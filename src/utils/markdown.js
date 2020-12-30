import marked from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export function parseMD(content) {
  return DOMPurify.sanitize(marked(content));
}