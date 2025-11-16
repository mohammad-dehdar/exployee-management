import * as React from 'react';
import type { SVGProps } from "react";

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
     width="1em" height="1em" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g opacity={0.7}><path d="M11.5 21.75C16.7467 21.75 21 17.4967 21 12.25C21 7.00329 16.7467 2.75 11.5 2.75C6.25329 2.75 2 7.00329 2 12.25C2 17.4967 6.25329 21.75 11.5 21.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /><path d="M22 22.75L20 20.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </g>
  </svg>
);

export default SearchIcon;