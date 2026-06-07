import { useLocalSearchParams } from "expo-router";
import {  useEffect,useState } from "react";
import { Text, View, Image } from "react-native";




export default function Index() {
    const [pokemon,setPokemon]=useState<any>(null) 
    const params = useLocalSearchParams()
    

     const getdata=async()=>{
        try{
            const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
            const data= await response.json()//await = waits inside the async function.
            setPokemon(data)
        }
        catch(e){
            console.log(e)
        }
     }
useEffect(()=>{
    if(params.name){
        getdata()
    }
},[params.name])

if(!pokemon){
    return<Text>....loading</Text>
}// this line is important to prevents errors and shows a loading message until the data arrives.



   return (
    
   <View>
      <Text>{pokemon.name}</Text>

      <Text>
        Type: {pokemon.types[0].type.name}
      </Text>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width: 150, height: 150 }}
      />
    </View>
    
  );
}
 


