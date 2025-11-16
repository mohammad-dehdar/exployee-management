import * as React from 'react';
import type { SVGProps } from "react";

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
     width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M1.96069 12.0009V7.72885C1.96069 2.42485 5.88854 0.252851 10.6948 2.90485L14.5725 5.04085L18.4501 7.17685C23.2564 9.82885 23.2564 14.1729 18.4501 16.8249L14.5725 18.9609L10.6948 21.0969C5.88854 23.7489 1.96069 21.5769 1.96069 16.2729V12.0009Z" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default PlayIcon;