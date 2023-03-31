/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
 import { StyleSheet } from 'react-native';
 import buttonStyles from './components/Buttons';
 
 interface Props {
   Colors: any;
 }
 
 interface Style {
   [key: string]: any;
 }
 
 interface Styles {
   button: Style;
   backgroundPrimary: Style;
   backgroundReset: Style;
   textInput: Style;
 }
 
 export default function styles({ Colors, ...args }: Props): Styles {
   return {
     button: buttonStyles({ Colors, ...args }),
     ...StyleSheet.create({
       backgroundPrimary: {
         backgroundColor: Colors.primary,
       },
       backgroundReset: {
         backgroundColor: Colors.transparent,
       },
       textInput: {
         backgroundColor: Colors.inputBackground,
         color: Colors.text,
         height: 45,
         borderRadius: 10,
         paddingStart: 20,
       },
     }),
   };
 }
