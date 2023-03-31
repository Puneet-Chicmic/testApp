import { StyleSheet } from 'react-native';

interface MetricsSizes {
  [key: string]: number;
}

interface Style {
  [key: string]: {
    [key: string]: number;
  };
}

export default function ({ MetricsSizes }: { MetricsSizes: MetricsSizes }) {
  return StyleSheet.create(
    Object.entries(MetricsSizes).reduce((acc: Style, [key, value]) => ({
      ...acc,
      /* Margins */
      [`${key}Margin`]: {
        margin: value,
      },
      [`${key}BMargin`]: {
        marginBottom: value,
      },
      [`${key}TMargin`]: {
        marginTop: value,
      },
      [`${key}RMargin`]: {
        marginRight: value,
      },
      [`${key}LMargin`]: {
        marginLeft: value,
      },
      [`${key}VMargin`]: {
        marginVertical: value,
      },
      [`${key}HMargin`]: {
        marginHorizontal: value,
      },
      /* Paddings */
      [`${key}Padding`]: {
        padding: value,
      },
      [`${key}BPadding`]: {
        paddingBottom: value,
      },
      [`${key}TPadding`]: {
        paddingTop: value,
      },
      [`${key}RPadding`]: {
        paddingRight: value,
      },
      [`${key}LPadding`]: {
        paddingLeft: value,
      },
      [`${key}VPadding`]: {
        paddingVertical: value,
      },
      [`${key}HPadding`]: {
        paddingHorizontal: value,
      },
    }), {})
  );
}
