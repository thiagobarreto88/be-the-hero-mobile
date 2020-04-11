import React, { useEffect, useState } from 'react';
import { View, Image, Text, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as MailComposer from 'expo-mail-composer';
import api from './../services/api';

export default function Detail() {
    
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso '${incident.title}' com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`

    function navigateToIncidents(){
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heróis do caso: ${incident.title}`,
            recipients: [ 'thiagobrrt88@gmail.com'],
            body: message
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View  style={styles.container} >
            <View style={styles.header}>
               <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateToIncidents}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}> ONG: </Text>
                <Text style={styles.incidentValue}> {incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}> ONG: </Text>
                <Text style={styles.incidentValue}> {incident.title} </Text>

                <Text style={styles.incidentProperty}> VALOR: </Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}> Salve o dia!</Text>
                <Text style={styles.heroTitle}> Seja o herói desse caso.</Text>
                <Text style={styles.heroTitleDescription}> Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}> WhatsApp </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}> E-mail </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}