import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';
/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */
export default function DocItemPaginator() {
  const {metadata} = useDoc();
  return (
    <DocPaginator
      className="docusaurus-mt-lg"
      previous={metadata.previous}
      next={metadata.next}
    />
  );
}
