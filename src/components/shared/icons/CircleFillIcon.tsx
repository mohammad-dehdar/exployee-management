import * as React from 'react';
import type { SVGProps } from "react";

const CircleFillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
     width="1em" height="1em" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><rect width={8} height={8} rx={4} fill="currentColor" />
  </svg>
);

export default CircleFillIcon;