import { Stack } from "@mantine/core"
import H2 from "../../components/H2";
import skillStyles from "../home/skills/Skills.module.css";
import toolStyles from "./Tool.module.css";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoogleExtension from "./components/google-extension/GoogleExtension";
import WindowsApp from "./components/windows-app/WindowsApp";
import Api from "./components/api/Api";
import BlogVersion from "./components/blog-version/BlogVersion";
import { useQuery } from "@tanstack/react-query";
import { getBlogVersion } from "../../api/getBlogVersion";
import { BranchInfoMap } from "../../interfaces/BlogVersionInterface";

const Tool = () => {
  const { data } = useQuery<BranchInfoMap[]>({
    queryKey: ["blogVersion"],
    queryFn: getBlogVersion,
  });

  const ref = useRef<HTMLDivElement>(null);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.fadeIn(ref.current, {});
    gsap.effects.scrollMoveXFadeIn(".scrollMoveXFadeIn", { scope: ref.current });
    ScrollTrigger.refresh();
  }, { scope: ref, dependencies: [data] });

  return (
    <section className="fadeIn" ref={ref}>
      <div className={toolStyles.space} />
      <Stack className={skillStyles.section}>
        <H2 text="Tool" />
        <Stack gap={30}>
          <GoogleExtension />
          <WindowsApp />
          <Api />
          <BlogVersion data={data} />
        </Stack>
      </Stack>
    </section>
  )
}

export default Tool