import React from 'react';

import authStyles from './Auth.css';

const auth = (props: any) => <section className={`${authStyles['auth-form']} my-5`}>{props.children}</section>;

export default auth;