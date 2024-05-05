import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, HStack, VStack, Input } from '@chakra-ui/react'
import Message from './components/Message';
import { app } from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);
const LoginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
const LogoutHandler = () => {
  signOut(auth);
}

function App() {
  const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messageArr, setMessageArr] = useState([]);
  const divforScroll = useRef(null);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divforScroll.current.scrollIntoView({ behaviour: "Smooth" })
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribeforMessages = onSnapshot(q, (snap) => {
      setMessageArr(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      )
    })
    return () => {
      unsubscribe();
      unsubscribeforMessages();
    }
  }, [])
  return (
    <Box bg={"red.30"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h="full" paddingY={"4"}>
            <Button w={"full"} colorScheme={"red"} onClick={LogoutHandler}>Logout</Button>

            <VStack w={"full"} h="full" overflowY={"auto"} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
              {
                messageArr.map((item) => (
                  <Message text={item.text} uri={item.photoURL} user={user.uid === item.uid ? "me" : "other"} />
                ))
              }
              <div ref={divforScroll}></div>
            </VStack>
            <form style={{ width: "100%" }} onSubmit={SubmitHandler}>
              <HStack>
                <Input placeholder='Enter your message' value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button type="submit" colorScheme={"purple"}>Send</Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack>
          <Button colorScheme={"purple"} justifyContent={"center"} h="100vh" onClick={LoginHandler}>Sign In With Google</Button>
        </VStack>

      )
      }
    </Box>
  );
}

export default App;
