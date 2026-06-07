import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
  <Stack.Screen
  name="index"  //this is file name
  options={{
    title:'Home' // changed file name
  }}/>

  <Stack.Screen
  name="details"
  options={{
    title:'Details'
  }}/>
  </Stack>;
}
