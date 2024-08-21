import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {LoginReq, schema} from '../interfaces/Request/User/LoginReq';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {login} from '../services/UserApi';
import {useDispatch} from 'react-redux';
import {setAuth} from '../redux/authSlice';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '../navigations/MyStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginReq>({resolver: yupResolver(schema)});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginReq) => {
    const res = await login(data);
    if (res.isSuccess) {
      dispatch(setAuth(res.data));
      navigation.navigate('Main');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login fail !!!',
        text2: 'Username or Password is not correct !!!',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4">
      <View className="w-full mb-8 items-center">
        <Image
          source={require('../assets/logo.png')}
          className="w-full h-32"
          style={{resizeMode: 'contain'}}
        />
      </View>
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-2xl font-bold mb-6 text-center">Login</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Username"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.userName ? true : false}
            />
          )}
          name="userName"
        />
        <HelperText type="error" visible={errors.userName ? true : false}>
          {errors.userName?.message}
        </HelperText>

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              secureTextEntry={!visible}
              mode="outlined"
              label="Password"
              right={
                <TextInput.Icon
                  icon={visible ? 'eye' : 'eye-off'}
                  onPress={() => setVisible(!visible)}
                />
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password ? true : false}
            />
          )}
          name="password"
        />
        <HelperText type="error" visible={errors.password ? true : false}>
          {errors.password?.message}
        </HelperText>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-green-500 p-3 rounded-lg">
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
