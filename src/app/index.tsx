import { useEffect,useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Index() {
  const [pokemon,setPokemon]=useState([])//we pass empty array for bulk of data

  //Api fuction
  const getdata= async()=>{
    try{
    const url="https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"
    const data= await fetch(url);
    const result=await data.json();
    setPokemon(result);
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
