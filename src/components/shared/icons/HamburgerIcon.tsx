import * as React from 'react';
import type { SVGProps } from "react";

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
     width="1em" height="1em" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><rect width={20} height={2} rx={1} fill="currentColor" /><rect y={6} width={20} height={2} rx={1} fill="currentColor" /><rect y={12} width={20} height={2} rx={1} fill="currentColor" />
  </svg>
);

export default HamburgerIcon;