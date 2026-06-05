import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const getdata= async()=>{
    try{
    const url="https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"
    const data= await fetch(url);
    const result=await data.json();
    console.log(result)
  }
catch(error){
  console.log(error)
} }
useEffect(()=>{
  getdata()
},[])
  
  return (
    <View style={styles.container}>
      <Text>Pokodex</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
