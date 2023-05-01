/* eslint-disable no-nested-ternary */
import { cssObj } from '@fuel-ui/css';

import type { PasswordStrength } from './types';

export const styles = {
  heading: cssObj({
    m: '$0',
  }),
  popover: cssObj({
    padding: '$0',
    border: '1px solid transparent',
    outlineColor: 'transparent',
    outline: 'none !important',
  }),
  popoverContainer: cssObj({
    layer: 'layer-card',
    px: '$3',
    py: '$3',
    flex: 1,
    flexDirection: 'column',
    gap: '$1',
    background: 'transparent',
    borderColor: 'transparent',

    h5: {
      lineHeight: 1,
      pb: '$2',
    },

    '.fuel_Icon[data-error="false"]': {
      color: '$intentsError9',
    },
    '.fuel_Icon[data-error="true"]': {
      color: '$brand',
    },
  }),
  strengthIndicatorContainer: cssObj({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '$2',
    width: '165px',
    mb: '$2',
  }),
  strengthIndicatorBase: cssObj({
    height: '6px',
    width: '$full',
    borderRadius: '$full',
    backgroundColor: '$intentsBase7',
  }),
  strengthIndicator: (strengthIndicator: PasswordStrength) =>
    cssObj({
      height: '6px',
      width: '$full',
      borderRadius: '$full',
      backgroundColor:
        strengthIndicator === 'weak'
          ? '$intentsError9'
          : strengthIndicator === 'average'
          ? '$intentsWarning9'
          : '$brand',
    }),
  rulesHeader: cssObj({
    color: '$intentsBase12',
    pb: '$1',
  }),
  arrow: cssObj({
    fill: '$overlayBg',
  }),
};
