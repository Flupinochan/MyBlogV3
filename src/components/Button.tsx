import React from 'react';
import "./Button.css";
import { UnstyledButton } from '@mantine/core';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => (
  <UnstyledButton className='btn'>{text}</UnstyledButton>
);

export default Button;
