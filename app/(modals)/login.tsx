import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });

  const onSelectAuth = useCallback(
    async (strategy: Strategy) => {
      const selectedAuth = {
        [Strategy.Google]: googleAuth,
        [Strategy.Apple]: appleAuth,
      }[strategy];

      try {
        const { createdSessionId, setActive } = await selectedAuth();
        if (createdSessionId) {
          setActive!({ session: createdSessionId });
          router.navigate('/(tabs)');
        }
      } catch (error) {
        console.log('OAuth error', error);
      }
    },
    [router, googleAuth, appleAuth],
  );

  return (
    <View style={style.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="e-mail"
        style={[defaultStyles.inputField, { marginBottom: 13 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={style.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors.dark,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={style.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors.dark,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={[style.btnOutline, { gap: 10 }]}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <FontAwesome5 name="google" size={24} />
          <Text style={style.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.btnOutline, { gap: 10 }]}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <FontAwesome5 name="apple" size={24} />
          <Text style={style.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});
export default Page;
