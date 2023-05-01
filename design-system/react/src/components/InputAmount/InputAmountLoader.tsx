import { darkColors } from '@fuel-ui/css';

import { Card } from '../Card';
import { ContentLoader } from '../ContentLoader';
import type { ContentLoaderProps } from '../ContentLoader';

export const InputAmountLoader = (props: ContentLoaderProps) => (
  <Card css={{ p: '$0' }}>
    <ContentLoader
      speed={2}
      height={66}
      backgroundColor={darkColors.intentsBase10}
      foregroundColor={darkColors.intentsBase5}
      {...props}
    >
      <ContentLoader.Rect x="12" y="21" width="100" height="24" rx="4" />
      <ContentLoader.Rect
        stickX="right"
        stickY="bottom"
        x="12"
        y="10"
        width="41"
        height="18"
        rx="4"
      />
      <ContentLoader.Rect
        stickX="right"
        stickY="bottom"
        x="58"
        y="11"
        width="72"
        height="16"
        rx="4"
      />
      <ContentLoader.Rect
        stickX="right"
        stickY="top"
        x="12"
        y="4"
        width="60"
        height="28"
        rx="4"
      />
    </ContentLoader>
  </Card>
);
