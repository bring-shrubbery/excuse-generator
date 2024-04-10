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
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

interface ExcuseContentType {
  intro: string[];
  scapegoat: string[];
  delay: string[];
}

const Index = (props: ExcuseContentType) => {
  const [intro, setIntro] = useState(0);
  const [scapegoat, setScapegoat] = useState(0);
  const [delay, setDelay] = useState(0);

  const toast = useToast();

  const regenerate = () => {
    setIntro(Math.floor(Math.random() * props.intro.length));
    setScapegoat(Math.floor(Math.random() * props.scapegoat.length));
    setDelay(Math.floor(Math.random() * props.delay.length));
  };

  const handleCopy = () => {
    const excuse = [intro, scapegoat, delay].join(" ");
    navigator.clipboard.writeText(excuse);

    toast({
      title: "Excuse copied",
      status: "success",
    });
  };

  return (
    <Container height="100vh">
      <Center minH="full">
        <VStack align="start" spacing={4}>
          <Heading maxW="full" fontSize="4xl">
            Random excuse generator
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

          <HStack w="full">
            <Button colorScheme="blue" w="full" onClick={regenerate}>
              Generate
            </Button>
            <IconButton aria-label="Copy" onClick={handleCopy}>
              <CopyIcon />
            </IconButton>
          </HStack>

          <HStack gap={1} mx="auto" fontStyle="italic">
            <Text fontSize="sm">Made in 5 minutes by</Text>
            <a
              href="https://github.com/bring-shrubbery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text fontSize="md" color="blue.500">
                Antoni
              </Text>
            </a>
          </HStack>
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
