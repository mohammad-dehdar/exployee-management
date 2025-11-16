import * as React from 'react';
import type { SVGProps } from "react";

const EmojiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
     width="1em" height="1em" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx={12} cy={12.5} r={10} stroke="currentColor" strokeWidth={1.5} /><path d="M9 16.5C9.85038 17.1303 10.8846 17.5 12 17.5C13.1154 17.5 14.1496 17.1303 15 16.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" /><path d="M16 11C16 11.8284 15.5523 12.5 15 12.5C14.4477 12.5 14 11.8284 14 11C14 10.1716 14.4477 9.5 15 9.5C15.5523 9.5 16 10.1716 16 11Z" fill="currentColor" /><ellipse cx={9} cy={11} rx={1} ry={1.5} fill="currentColor" />
  </svg>
);

export default EmojiIcon;