import React from 'react';
import { UnstyledButton } from '@mantine/core';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => (
  <UnstyledButton className={styles.btn}><p>{text}</p></UnstyledButton>
);

export default Button;
