import { useEffect,useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

interface Pokemon{
  name:string
  image:string
  imageBack:string
  types:PokemonType
}

interface PokemonType{
  type:{
  name:string,
  url:string}
}

export default function Index() {
  const [pokemon,setPokemon]=useState<Pokemon[]>([])//we pass empty array for bulk of data    any[] is the type of array value

  //Api fuction
  const getdata= async()=>{
    try{
    const url="https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"
    const data= await fetch(url);
    const result=await data.json();

// this function to fetch image of pokemon because it stores the image inside result:[{name:"bulbasaur",url:"https://pokeapi.co/api/v2/pokemon/21"}] inside this url our imgage is available
    const detailedPokemons= await Promise.all(//group all promises into one promise and wait untill it's completion
      result.results.map(async(pokemon:any)=>{//it maps all result data inside the local variable pokemon
        const res = await fetch(pokemon.url);//this is the url inside the result object 
        const details = await res.json();
        return{
          name:pokemon.name,//pokemon is local variable 
          image:details.sprites.front_default,
          imageBack:details.sprites.back_default,
          types:details.types
        };
      })
    );
    setPokemon(detailedPokemons);
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
    <View style={{flexDirection:'row'}}>
    <Image
    source={{uri: pokemons.image}}
    style={{height:100, width:100}}/>
    <Image
    source={{uri: pokemons.imageBack}}
    style={{height:100, width:100}}/>
  </View>
  </View>
))}
    </ScrollView>
  );
}


