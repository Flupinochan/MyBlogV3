import { Space, Stack } from "@mantine/core"
import H2 from "../../components/H2";
import skillStyles from "../home/skills/Skills.module.css";
import toolStyles from "./Tool.module.css";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoogleExtension from "./google-extension/GoogleExtension";
import WindowsApp from "./windows-app/WindowsApp";
import Api from "./api/Api";
import BlogVersion from "./blog-version/BlogVersion";
import { useQuery } from "@tanstack/react-query";
import { getBlogVersion } from "../../api/getBlogVersion";
import { IBlogVersion } from "../../interfaces/BlogVersionInterface";

const Tool = () => {
  const { data, isSuccess } = useQuery<IBlogVersion[]>({
    queryKey: ["blogVersion"],
    queryFn: getBlogVersion,
    retry: 3,
  });

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.fadeIn(ref.current, { scope: ref.current });
    gsap.effects.scrollMoveXFadeIn(".scrollMoveXFadeIn", { scope: ref.current });
    ScrollTrigger.refresh();
  }, { scope: ref, dependencies: [data] });

  return (
    <section className="fadeIn" ref={ref}>
      <div className={toolStyles.space} />
      <Stack className={skillStyles.section}>
        <H2 text="Tool" />
        <Space h={10} />
        <Stack gap={30}>
          <GoogleExtension />
          <WindowsApp />
          <Api />
          {isSuccess ? (
            <BlogVersion data={data} />
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </section>
  )
}

export default Tool