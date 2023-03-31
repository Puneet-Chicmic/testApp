import { StyleSheet } from 'react-native';

interface Styles {
  base: any;
  rounded: any;
  outline: any;
  outlineRounded: any;
}

interface Props {
  Colors: any;
  Gutters: any;
  Layout: any;
}

export default function styles({ Colors, Gutters, Layout }: Props): Styles {
  const base = {
    ...Layout.center,
    ...Gutters.regularHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  };

  const rounded = {
    ...base,
    borderRadius: 10,
  };

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });
}
