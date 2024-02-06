"use client";

import { Button, View, Text } from "reshaped";
import { useState } from "react";

export default function Home() {
  //   const item = {
  //     prompt: "What's the use of useScrollLock?",
  //     linkUrl: "https://reshaped.so",
  //     linkText: "useScrollLock - Reshaped",
  //     answer: (
  //       <>
  //         <Text color="neutral-faded">
  //           The useScrollLock hook is a custom React hook designed to lock and
  //           unlock page scrolling. It provides a way to preserve the scroll
  //           position when the scroll is locked or unlocked and avoids page width
  //           changes that might occur when the scrollbar is hidden. This hook is
  //           particularly useful when displaying content on top of the page, such
  //           as modals or overlays, and you want to prevent the user from scrolling
  //           the background content.
  //         </Text>
  //         <View
  //           padding={3}
  //           borderRadius="medium"
  //           backgroundColor="neutral-faded"
  //           overflow="auto"
  //           attributes={{
  //             style: { whiteSpace: "pre", fontFamily: "monospace" },
  //           }}
  //         >
  //           {`import { useScrollLock } from "reshaped";

  // function Example() {
  // const { lockScroll, unlockScroll } = useScrollLock();
  // }`}
  //         </View>
  //       </>
  //     ),
  //   };

  const [content, setContent] = useState<
    { prompt: string; answer: string; linkUrl?: string; linkText?: string }[]
  >([]);

  const handleSubmit = async (args: { prompt: string }) => {
    let answer = "";

    setContent((prev) => [...prev, { prompt: args.prompt, answer: "" }]);

    const response = await fetch("https://api.hermae.com/spaces/reshaped", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_id: null,
        prompt: args.prompt,
      }),
    });
    const reader = response.body?.getReader();

    const processText = ({ done, value }: any): any => {
      if (done) {
        console.log("Stream complete");
        return;
      }

      const chunk = new TextDecoder("utf-8").decode(value);

      answer += chunk;

      setContent((prev) => {
        const next = [...prev];

        let formattedAnswer = answer
          .replace(/```(jsx|js)\n([\s\S]*?)```/g, "<code>$2</code>")
          .replace(/`([a-zA-Z]*)`/g, `<span class="code">$1</span>`);

        next[next.length - 1].answer = formattedAnswer;

        return next;
      });

      return reader?.read().then(processText);
    };

    const result = reader?.read();
    processText(result);
  };

  return (
    <View padding={4}>
      <Button href="https://reshaped.so">Click me</Button>
    </View>
  );
}
