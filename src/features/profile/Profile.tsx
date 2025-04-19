import { Accordion, Stack } from "@mantine/core"
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import H2 from "../../components/H2";
import skillStyles from "../home/skills/Skills.module.css";
import toolStyles from "../tool/Tool.module.css";

const profileItems = [
  {
    value: '名前',
    description: '川越 鉄郎 (かわごえ てつろう)',
  },
  {
    value: '年齢',
    description: '26歳 1999年生まれ',
  },
  {
    value: '所在地',
    description: '神奈川県',
  },
  {
    value: '連絡先',
    description: 'flupino@metalmental.net',
  },
  {
    value: '職業',
    description: 'フルスタックエンジニア',
  },
  {
    value: '専門分野',
    description: 'IaC、CI/CD',
  },
  {
    value: '趣味',
    description: [
      '・ゲーム (World of Tanks)',
      '・アニメ (葬送のフリーレン)',
      '・モデリング (Blender、Live2D、The Sandbox、MagicaVoxel)',
      '・動画作成 (ゆっくりMovieMaker、Adobe Premiere Pro、MMD、GIMP)',
    ].join('<br/>'),
  },
  {
    value: '資格',
    description: [
      '・情報処理技能検定試験 表計算1級',
      '・文書デザイン検定試験 2級',
      '・秘書技能検定試験 3級',
      '・ビジネス文書技能検定試験 3級',
      '・LPIC-3 (300 Enterprise Professional Mixed Environment)',
      '・LPIC-3 (304 Enterprise Professional Virtualization & High Availability)',
      '・CCNA (Cisco Certified Network Associate)',
      '・AWS SAA (AWS Certified Solutions Architect - Associate)',
      '・Python3 エンジニア認定基礎試験',
      '・Java Silver (Oracle Certified Java Programmer, Silver SE 17)',
      '・OSS-DB Silver (PostgreSQL)'
    ].join('<br/>'),
  },
  {
    value: 'スキル',
    description: [
      '記載予定',
    ].join('<br/>'),
  },
  {
    value: 'ツール',
    description: [
      '・IntelliJ IDEA',
      '・Visual Studio',
      '・Visual Studio Code',
      '・DBeaver',
      '・Git BASH',
      '・Vim',
      '・Unity',
      '・Postman',
      '・Figma',
      '・draw.io',
      '・RLogin'
    ].join('<br/>'),
  },
];

const Profile = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  useGSAP((_context, _contextSafe) => {
    gsap.effects.fadeIn(sectionRef.current, { scope: sectionRef.current });
    gsap.effects.scrollMoveXFadeIn(".scrollMoveXFadeIn", { scope: sectionRef.current });
    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  const [opened, setOpened] = useState<string | null>(null);
  const handleChange = (value: string | null) => {
    const index = profileItems.findIndex((item) => item.value === value);
    if (index !== -1 && value !== opened) {
      const target = textRefs.current[index];
      if (target) {
        gsap.effects.textAnimation2(target, { scope: target });
      }
    }
    setOpened(value);
  };


  return (
    <section className="fadeIn" ref={sectionRef}>
      <div className={toolStyles.space} />
      <Stack className={skillStyles.section}>
        <H2 text="Profile" />
        <Accordion variant="default" chevronPosition="left" onChange={handleChange}>
          {profileItems.map((item, index) => (
            <Accordion.Item key={item.value} value={item.value} className="scrollMoveXFadeIn">
              <Accordion.Control>
                {item.value}
              </Accordion.Control>
              <Accordion.Panel>
                <p
                  ref={(el) => (textRefs.current[index] = el)}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </section>
  )
}

export default Profile