/**
 * This file contains all application's style relative to fonts
 */
 import { StyleSheet } from 'react-native';

 interface Props {
   FontSize: {
     tiny: number;
     small: number;
     regular: number;
     large: number;
   };
   Colors: {
     text: string;
     error: string;
     success: string;
     primary: string;
   };
 }
 
 interface Style {
   [key: string]: any;
 }
 
 interface Styles {
   textTiny: Style;
   textSmall: Style;
   textRegular: Style;
   textLarge: Style;
   textBold: Style;
   textUppercase: Style;
   titleSmall: Style;
   titleRegular: Style;
   titleLarge: Style;
   textCenter: Style;
   textJustify: Style;
   textLeft: Style;
   textRight: Style;
   textError: Style;
   textSuccess: Style;
   textPrimary: Style;
   textLobster: Style;
 }
 
 export default function styles({ FontSize, Colors }: Props): Styles {
   return StyleSheet.create({
     textTiny: {
       fontSize: FontSize.tiny,
       color: Colors.text,
     },
     textSmall: {
       fontSize: FontSize.small,
       color: Colors.text,
     },
     textRegular: {
       fontSize: FontSize.regular,
       color: Colors.text,
     },
     textLarge: {
       fontSize: FontSize.large,
       color: Colors.text,
     },
     textBold: {
       fontWeight: 'bold',
     },
     textUppercase: {
       textTransform: 'uppercase',
     },
     titleSmall: {
       fontSize: FontSize.small * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     titleRegular: {
       fontSize: FontSize.regular * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     titleLarge: {
       fontSize: FontSize.large * 2,
       fontWeight: 'bold',
       color: Colors.text,
     },
     textCenter: {
       textAlign: 'center',
     },
     textJustify: {
       textAlign: 'justify',
     },
     textLeft: {
       textAlign: 'left',
     },
     textRight: {
       textAlign: 'right',
     },
     textError: {
       color: Colors.error,
     },
     textSuccess: {
       color: Colors.success,
     },
     textPrimary: {
       color: Colors.primary,
     },
     textLobster: {
       fontFamily: 'lobster',
       fontWeight: 'normal',
     },
   });
 }