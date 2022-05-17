import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  options:{
    width:'100%',
    marginBottom: 48,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title:{
    fontSize: 20,
    color: theme.colors.text_primary,
    marginBottom:32,
    fontFamily: theme.fonts.medium,
  }
});