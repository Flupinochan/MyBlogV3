import React from 'react';
import { UnstyledButton } from '@mantine/core';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset" | undefined,
}

const Button: React.FC<ButtonProps> = (props) => (
  <UnstyledButton className={styles.btn} type={props.type}><p>{props.text}</p></UnstyledButton>
);

export default Button;
