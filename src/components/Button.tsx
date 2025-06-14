import React from 'react';
import { UnstyledButton } from '@mantine/core';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset" | undefined,
  onClick?: () => void;
  pending?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => (
  <UnstyledButton onClick={props.onClick} className={`${styles.btn} ${props.pending ? styles.disabled : ''}`} type={props.type}><p>{props.text}</p></UnstyledButton>
);

export default Button;
