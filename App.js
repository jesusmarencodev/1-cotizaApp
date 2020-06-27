/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  YellowBox,
} from 'react-native';
import {PRIMARY_COLOR} from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculate from './src/components/ResultCalculate';

YellowBox.ignoreWarnings(['Picker has been extracted']);

export default function App() {
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMounths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    if(capital && interest && months) calculate();
    else reset();
  }, [capital, interest, months]);


  const calculate = (() => {
    reset();
    if (!capital){
      setErrorMessage('Añade la cantidad que quieres solicitar');
    } else if (!interest){
      setErrorMessage('Añade el interes del prestamo');
    } else if (!months){
      setErrorMessage('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
      setTotal({
        monthlyFee : fee.toFixed(2).replace('.', ','), //reemplaza el punto por coma
        totalPayable : ((fee * months).toFixed(2).replace('.', ',')),
      });
    }
  });

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  };

  return (
    <>
      {/*     StatusBar ssta opcion es para Ios, lo que hace es quelos iconos como bateria, hora, etc se vean blancos y
    contrasten con el fondo en Ios toma toda la parte superior de la pantalla */}
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>LOAN QUOTE</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMounths={setMounths} />
      </SafeAreaView>
      <ResultCalculate
        capital = {capital}
        interest = {interest}
        months = {months}
        total = {total}
        errorMessage = {errorMessage}
      />
      <Footer calculate={calculate}/>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    //backgroundColor: PRIMARY_COLOR,
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1, //el z index en reactNative solo funciona si se tiene una posicion relativa o absoluta
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
});
