import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        className={`!absolute top-0 left-0 w-full h-full flex items-center -z-50 bg-[url("/low-poly-grid-haikei.svg")] bg-cover bg-center`}
      ></div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen min-w-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="grid gap-4 items-center justify-items-center">
            <Heading as="h1" size="9">
              Your cutting-edge information repository
            </Heading>
            <Heading as="h2" size="7">
              Crunching Numbers for Your Perfect Lunch
            </Heading>
            <Flex className="w-full" gap="4" justify="center">
              <Button size="3">Try it out</Button>
              <Button size="3">Pricing</Button>
            </Flex>
          </div>
          <div>
            <Heading as="h2" size="7">
              Your data, your way
            </Heading>
            <Text>
              Get data-driven insights into your lunch habits. Analytics,
              statistics, quadratics - your data served however you need it.
            </Text>
          </div>
        </main>
      </div>
    </>
  );
}
