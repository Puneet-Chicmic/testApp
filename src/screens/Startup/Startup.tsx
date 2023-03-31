import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
import { useMeQuery } from '../../services/modules/users';

const Startup = ({ navigation }: { navigation: any }): JSX.Element => {
  const userDetails = useMeQuery();
  const { colors } = useTheme();
  const [useCredit, setUseCredit] = React.useState<boolean>(false);

  // useEffect(() => {
  //     init();
  // }, []);

  return (
    <>
      {!!userDetails?.me?.yellowCredits && (
        <ListItem>
          <View useNativeDriver animation="fadeIn" style={styles.selectcheck}>
            <View
              useNativeDriver
              animation="fadeIn"
              style={{
                height: 20,
                width: 20,
                backgroundColor: colors.primary,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
              }}
            >
              <IconButton
                name={useCredit ? 'check' : ''}
                iconColor="secondary"
                onPress={() => {
                  setUseCredit(!useCredit);
                }}
              />
            </View>
            <View useNativeDriver animation="fadeIn" style={{ marginLeft: 30 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontFamily: 'Lato-Regular',
                  textAlignVertical: 'top',
                  padding: 0,
                  color: colors.textPrimary,
                }}
              >
                {`Use $${userDetails?.me?.yellowCredits} Yellow Credit balance.`}
              </Text>
            </View>
          </View>
        </ListItem>
      )}
    </>
  );
};

export default Startup;
