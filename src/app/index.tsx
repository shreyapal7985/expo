import { Link } from "expo-router";
import { useEffect,useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, Pressable } from "react-native";

interface Pokemon{
  name:string
  image:string
  imageBack:string
  types:PokemonType[]
}

interface PokemonType{
  type:{
  name:string,
  url:string}
}

const colorByType={
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

export default function Index() {
  const [pokemon,setPokemon]=useState<Pokemon[]>([])//we pass empty array for bulk of data    any[] is the type of array value
  console.log(JSON.stringify(pokemon[0], null, 2))

  //Api fuction
  const getdata= async()=>{
    try{
    const url="https://pokeapi.co/api/v2/pokemon/?limit=20"
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
          /* types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/"
      }
    },
 */
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
    <ScrollView 
    contentContainerStyle={{
      gap:16,
      padding:16
    }}>
      {pokemon.map((pokemons) => (
        <Link key={pokemons.name}
        href={"/details"}>
  <View 
  //@ts-ignore
  style={{backgroundColor:colorByType[pokemons.types[0].type.name]+50, padding:20,borderColor:"red",borderWidth:2,
    borderRadius:20
  }}>//on the (type) basis background color will change    +50 is opacity for background
    <Text style={styles.name}>{pokemons.name}</Text>
    <Text style={styles.type}>{pokemons.types[0].type.name}</Text>
    <View style={{flexDirection:'row'}}>
    <Image
    source={{uri: pokemons.image}}
    style={{height:160, width:160}}/>
    <Image
    source={{uri: pokemons.imageBack}}
    style={{height:160, width:160}}/>
  </View>
  </View>
  </Link>
))}
    </ScrollView>
  );
}
 const styles=StyleSheet.create({
  name:{
    fontSize:28,
    fontWeight:'bold',
    textAlign:'center'
  },
  type:{
    fontSize:20,
    fontWeight:'bold',
    color:'grey',
    textAlign:'center'
  }
 })


