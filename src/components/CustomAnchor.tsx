import React from 'react';
import { Anchor } from '@mantine/core';
import styles from "./Button.module.css"

type CustomAnchorProps = {
  text: string;
  href: string;
};

/**
 * hrefが # で始まる場合はページ内リンク、
 * それ以外は外部リンクとして、target や rel を設定
 */
const CustomAnchor: React.FC<CustomAnchorProps> = (props) => {
  const isInternal = props.href.startsWith('#');

  return (
    <Anchor
      href={props.href}
      className={styles.btn}
      unstyled
      target={isInternal ? undefined : '_blank'}
      rel={isInternal ? undefined : 'noopener noreferrer'}
    >
      {props.text}
    </Anchor>
  );
};

export default CustomAnchor;
