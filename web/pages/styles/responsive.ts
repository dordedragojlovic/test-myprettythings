import { screen } from './resolution';


export const responsive = {
  xxs: `@media (max-width: ${screen.xxs}px)`,
  xs: `@media (max-width: ${screen.xsMax}px)`,
  sm: `@media (min-width: ${screen.smMin}px) and (max-width: ${screen.smMax}px)`,
  md: `@media (min-width: ${screen.mdMin}px) and (max-width: ${screen.mdMax}px)`,
  mdpi: `@media (min-width: ${screen.mdpiMin}px) and (max-width: ${screen.mdpiMax}px)`,
  mac: `@media (min-width: ${screen.macMin}px) and (max-width: ${screen.macMax}px)`,
  lg: `@media (min-width: ${screen.lgMin}px) and (max-width: ${screen.lgMax}px)`,
  xl: `@media (min-width: ${screen.xlMin}px)`,
  tablet: `@media only screen and (orientation: portrait)`,
  iPad: `@media (min-width: ${screen.xs}) and (max-width: ${screen.sm}px)`,
  iPadPro: `@media only screen and (orientation: portrait) and (min-width: ${screen.mdMin}px) and (max-width: ${screen.mdMax}px)`,
};
