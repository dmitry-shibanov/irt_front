import React from 'react';
import serverError from './ServerError.css';
import { Link } from 'react-router-dom';

const ServerError: React.FC = (props) => {
  return (
    <div className={serverError['wrapper']}>
      <div className={serverError['box']}>
        <h1>500</h1>
        <p>Sorry, it's me, not you.</p>
        <p>&#58;&#40;</p>
        <p>
          <Link to="/">Let me try again!</Link>
        </p>
      </div>
    </div>
  );
};

export default ServerError;
