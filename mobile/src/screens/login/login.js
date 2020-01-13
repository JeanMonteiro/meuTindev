import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native'
import logo from '../../assets/logo.png'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

export default Login = ({navigation}) => {

    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, [])

    handleLogin = async () => {
        res = await api.post('/devs', { username: user })
        console.log(res);
        
        const { id } = res.data
        await AsyncStorage.setItem('user', JSON.stringify(id))
        navigation.navigate('home', { user: id })
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Image source={logo}></Image>

            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Digite seu usuário no Github'
                placeholderTextColor='#999'
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})