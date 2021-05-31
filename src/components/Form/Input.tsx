import React from 'react';
import Inputs from './Input.css';

const input = (props: any) => (
  <div className={Inputs['input']}>
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    {props.control === 'input' && (
      <input
        className={[
          !props.valid ? Inputs['invalid'] : Inputs['valid'],
          props.touched ? Inputs['touched'] : Inputs['untouched'],
        ].join(' ')}
        type={props.type}
        id={props.id}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.onChange(props.id, e.target.value, e.target.files)
        }
        onBlur={props.onBlur}
      />
    )}
    {props.control === 'textarea' && (
      <textarea
        className={[
          !props.valid ? Inputs['invalid'] : Inputs['valid'],
          props.touched ? Inputs['touched'] : Inputs['untouched'],
        ].join(' ')}
        id={props.id}
        rows={props.rows}
        required={props.required}
        value={props.value}
        onChange={(e) => props.onChange(props.id, e.target.value)}
        onBlur={props.onBlur}
      />
    )}
  </div>
);

export default input;
