import { useGSAP } from "@gsap/react";
import { Space, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { getBlogVersion } from "../../api/getBlogVersion";
import H2 from "../../components/H2";
import { IBlogVersion } from "../../interfaces/BlogVersionInterface";
import skillStyles from "../home/skills/Skills.module.css";
import Api from "./api/Api";
import BlogVersion from "./blog-version/BlogVersion";
import GoogleExtension from "./google-extension/GoogleExtension";
import MobileApp from "./mobile-app/MobileApp";
import toolStyles from "./Tool.module.css";
import WindowsApp from "./windows-app/WindowsApp";

const Tool = () => {
  const { data, isSuccess } = useQuery<IBlogVersion[]>({
    queryKey: ["blogVersion"],
    queryFn: getBlogVersion,
    retry: 3,
  });

  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    (_context, _contextSafe) => {
      gsap.effects.fadeIn(ref.current, { scope: ref.current });
      gsap.effects.scrollMoveXFadeIn(".scrollMoveXFadeIn", {
        scope: ref.current,
      });
      ScrollTrigger.refresh();
    },
    { scope: ref, dependencies: [data] },
  );

  return isSuccess ? (
    <section className="fadeIn" ref={ref}>
      <div className={toolStyles.space} />
      <Stack className={skillStyles.section}>
        <H2 text="Tool" />
        <Space h={10} />
        <Stack gap={30}>
          <MobileApp />
          <GoogleExtension />
          <WindowsApp />
          <Api />
          <BlogVersion data={data} />
        </Stack>
      </Stack>
    </section>
  ) : (
    <></>
  );
};

export default Tool;
