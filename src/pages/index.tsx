import { readFileSync } from "fs";
import { useState } from "react";
import { GetStaticProps } from "next";
import {
  Text,
  Center,
  Container,
  Stack,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";

interface ExcuseContentType {
  intro: string[];
  scapegoat: string[];
  delay: string[];
}

const Index = (props: ExcuseContentType) => {
  const [intro, setIntro] = useState(0);
  const [scapegoat, setScapegoat] = useState(0);
  const [delay, setDelay] = useState(0);

  const regenerate = () => {
    setIntro(Math.floor(Math.random() * props.intro.length));
    setScapegoat(Math.floor(Math.random() * props.scapegoat.length));
    setDelay(Math.floor(Math.random() * props.delay.length));
  };

  return (
    <Container height="100vh">
      <Center minH="full">
        <VStack align="start" spacing={4}>
          <Heading maxW="15ch" fontSize="4xl">
            Random plans excuse generator
          </Heading>

          <Stack direction={{ base: "column", md: "row" }} spacing={1}>
            <VStack align="start" spacing={0}>
              <Text fontSize="small">Intro</Text>
              <Text fontSize="xl">{props.intro[intro]}</Text>
            </VStack>

            <VStack align="start" spacing={0}>
              <Text fontSize="small">Scapegoat</Text>
              <Text fontSize="xl">{props.scapegoat[scapegoat]}</Text>
            </VStack>

            <VStack align="start" spacing={0}>
              <Text fontSize="small">Delay</Text>
              <Text fontSize="xl">{props.delay[delay]}</Text>
            </VStack>
          </Stack>

          <Button colorScheme="green" w="full" onClick={regenerate}>
            Generate
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<ExcuseContentType> = () => {
  const rawExcuses = readFileSync("src/content/excuse.json", "utf8");
  const jsonExcuses = JSON.parse(rawExcuses) as ExcuseContentType;

  return {
    props: jsonExcuses,
  };
};
