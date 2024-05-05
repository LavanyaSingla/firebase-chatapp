import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'
const Message = ({ text, uri, user = "other" }) => {
  return (
    <HStack bg={"gray.100"} paddingY={"2"} borderRadius={"base"} alignSelf={user === "me" ? "flex-end" : "flex-start"}
      paddingX={user === "me" ? "4" : "2"}>
      {
        user === "other" ? <Avatar src={uri} /> : "none"
      }
      <Text>{text}</Text>
      {
        user === "me" ? <Avatar src={uri} />
          : "none"
      }
    </HStack>
  )
}

export default Message