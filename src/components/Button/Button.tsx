import React from 'react';
import { Link } from 'react-router-dom';

import buttons from './Button.css';

const Button = (props: any) =>
  !props.link ? (
    <button
      className={[
        buttons['button'],
        buttons[`button--${props.design}`],
        buttons[`button--${props.mode}`],
      ].join(' ')}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      type={props.type}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  ) : (
    <Link
      className={[
        buttons['button'],
        buttons[`button--${props.design}`],
        buttons[`button--${props.mode}`],
      ].join(' ')}
      to={props.link}
    >
      {props.children}
    </Link>
  );

export default Button;