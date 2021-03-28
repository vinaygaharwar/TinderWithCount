import React from 'react';
import {Image,StyleSheet,Text,View,SafeAreaView,TouchableOpacity} from 'react-native';
import data from './data';
import Swiper from 'react-native-deck-swiper';
import { Transitioning, Transition } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const stackSize = 2;

const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type='slide-bottom'
      durationMs={ANIMATION_DURATION}
      interpolation='easeIn'
    />
    <Transition.Together>
      <Transition.In
        type='fade'
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type='slide-bottom'
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation='easeOut'
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

const Card = ({ card }) => {
  return (
    
    <View >
      
      <Image  source={{ uri: card.image }} style={styles.cardImage} />
    </View>
  );
};

const CardDetails = ({ index }) => (
  <View key={data[index].id} style={{ alignItems: 'center' }}>
    <Text style={[styles.text, styles.heading]} numberOfLines={2}>
      {data[index].name}
    </Text>
  </View>
);

function Home({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [countL, setCountL] = React.useState(0);
  const [countR, setCountR] = React.useState(0);

  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % data.length);
  };

  return (

    <SafeAreaView style={styles.container}>
      <View>
      <Image
            style={{width:70,height:60,alignSelf:'center',marginBottom:-30}}         
            source={require('./tinder1.jpg')}
            />
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={card => <Card card={card} />}
          infinite
          backgroundColor={'transparent'}
          onSwiped={onSwiped}
          onTapCard={() => {swiperRef.current.swipeLeft();setCountL(countL + 1)}}
          onSwipedRight={() => {setCountR(countR + 1)}}
          onSwipedLeft={() => {setCountL(countL + 1)}}
          stackSize={stackSize}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  borderColor:'red',
                  color: 'red',
                  borderWidth: 1,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  borderColor: 'green',
                  color: 'green',
                  borderWidth: 1,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20
                }
              }
            }
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={styles.bottomContainerMeta}
        >
          <CardDetails index={index} />
        </Transitioning.View>
        <View style={styles.bottomContainerButtons}>
          <MaterialCommunityIcons.Button
            name='close'
            size={60}
            backgroundColor='transparent'
            color='#EC2379'
            onPress={() => {swiperRef.current.swipeLeft() ;setCountL(countL + 1)} }
          />
          <MaterialCommunityIcons.Button
            name='heart'
            size={60}
            backgroundColor='transparent'
            color='#27d687'
            onPress={() => {swiperRef.current.swipeRight();setCountR(countR + 1)}}
          />
          <TouchableOpacity
          style={{width:100,height:40,backgroundColor:'orange',marginTop:15,borderRadius:20}}
           onPress={() => {
          navigation.navigate('Details', {
            countL:countL,
            countR:countR,
          });
        }}
      ><Text style={{fontWeight:'bold',alignSelf:'center',marginTop:8,color:'white'}}>Done</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }) {
  const { countL } = route.params;
  const { countR } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={{  width:500,alignItems: 'center'}}>
      <Image
            style={{width:350,height:100,alignSelf:'center',marginTop:20}}         
            source={require('./tinder3.png')}
            />
      </View>
      <Text style={{fontSize:24,color:'grey',marginTop:20}}>  Lets See How Many People </Text>
      <Text style={{fontSize:24,color:'grey'}}>   You Liked And Disliked</Text>
      <MaterialCommunityIcons.Button
            name='heart'
            size={50}
            backgroundColor='transparent'
            color='#27d687'
          ><Text>Liked: {countR}</Text></MaterialCommunityIcons.Button>
      <MaterialCommunityIcons.Button
            name='close'
            size={50}
            backgroundColor='transparent'
            color='#EC2379'
          ><Text>Disliked: {countL}</Text></MaterialCommunityIcons.Button>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tinder" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height:800,
  },
  swiperContainer: {
    flex: 1
  },
  bottomContainer: {
    flex: 0.2,
    justifyContent: 'space-evenly'
  },
  bottomContainerMeta: { alignContent: 'flex-end', alignItems: 'center' },
  bottomContainerButtons: {
    marginTop:50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardImage: {
    width: 350,
    height:500,
    backgroundColor:'white',
    borderRadius:15,
    alignSelf:'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  },
  
  heading: { 
    fontSize: 24,
    fontWeight:'bold', 
    marginBottom: 10,
     color: '#d4cebe',
     marginTop:-120,
     marginRight:170,
  
 },
  
});


