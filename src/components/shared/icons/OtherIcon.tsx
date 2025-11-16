import * as React from 'react';
import type { SVGProps } from "react";

const OtherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
     width="1em" height="1em" viewBox="0 0 32 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><rect width={8} height={8} rx={4} fill="#currentColor" /><rect x={12} width={8} height={8} rx={4} fill="#currentColor" /><rect x={24} width={8} height={8} rx={4} fill="#currentColor" />
  </svg>
);

export default OtherIcon;