import React from 'react';
import { NavLink } from 'react-router-dom';

function Jumbotron(props) {
  return (
    <div
      className={`
        jumbotron
        ${props.fluid ? 'jumbotron-fluid' : ''}
        bg-${props.bg || 'default'}
        text-${props.color || 'dark'}
        text-center
        `}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1>{props.pageTitle}</h1>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="col-12 col-md-6">
            <NavLink to="/search" className="btn btn-info btn-lg">
              Search
            </NavLink>
          </div>
          <div className="col-12 col-md-6">
            <NavLink to="/saved" className="btn btn-warning btn-lg">
              Saved
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
