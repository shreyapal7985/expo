import { useEffect,useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Index() {
  const [pokemon,setPokemon]=useState<any[]>([])//we pass empty array for bulk of data    any[] is the type of array value

  //Api fuction
  const getdata= async()=>{
    try{
    const url="https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"
    const data= await fetch(url);
    const result=await data.json();
    setPokemon(result.results);
  /*here results is a property inside the objects which contains the name of pokemons only result stores the whole api data ex-{
  count: 1350,
  next: "...",
  previous: null,
  results: [ ...pokemon list... ]
}*/
  }
catch(error){
  console.log(error)
} } 

 //calling Api
useEffect(()=>{
  getdata()
},[])
  
  return (
    <ScrollView>
      {pokemon.map((pokemons) => (
  <View key={pokemons.name}>
    <Text>{pokemons.name}</Text>
  </View>
))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
