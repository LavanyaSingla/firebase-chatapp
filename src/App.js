import {Box,Button,Container,HStack,VStack,Input} from '@chakra-ui/react'
import Message from './components/Message';
function App() {
  return (
    <Box bg={"red.30"}>
      <Container h={"100vh"} bg={"white"}>
        <VStack h="full" paddingY={"4"}> 
        <Button w={"full"} colorScheme={"red"} >Logout</Button>
       
        <VStack w={"full"} h="full" overflowY={"auto"}></VStack>
        <Message text={"Sample "}/>
          <form style={{width:"100%"}}>
          <HStack>
            <Input placeholder='Enter your message'/>
            <Button type="submit" colorScheme={"purple"}>Send</Button>
            </HStack>
          </form>
          </VStack>
      </Container>
    </Box>
  );
}

export default App;
