'use client';

import DOMPurify from 'isomorphic-dompurify';

interface Props {
    htmlContent: string;
}

export default function RichText({ htmlContent }: Props) {
    const sanitizedHtml = DOMPurify.sanitize(htmlContent);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: sanitizedHtml,
            }}
        />
    );
}
