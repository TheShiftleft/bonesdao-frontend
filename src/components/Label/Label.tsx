import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

interface LabelProps {
  text?: string;
  variant?: 'primary' | 'secondary' | 'normal';
  color?: string;
  bold?: boolean;
}

const Label: React.FC<LabelProps> = ({ text, variant = 'secondary', color: customColor, bold }) => {
  const { color } = useContext(ThemeContext);

  let labelColor: string;
  if (customColor) {
    labelColor = customColor;
  } else {
    if (variant === 'primary') {
      labelColor = color.primary.main;
    } else if (variant === 'secondary') {
      labelColor = '#2c2560'; //color.secondary.main;
    } else if (variant === 'normal') {
      labelColor = '#2c2560'; //color.grey[300];
    }
  }
  return <StyledLabel color={labelColor} bold>{text}</StyledLabel>;
};

interface StyledLabelProps {
  color: string;
  bold: boolean;
}

const StyledLabel = styled.div<StyledLabelProps>`
  color: ${(props) => props.color};
  font-weight: ${(props) => props.bold ? 'bold' : '400'}
`;

export default Label;
