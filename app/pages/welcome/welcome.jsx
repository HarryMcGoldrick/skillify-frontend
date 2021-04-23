import {
  Button, Grid, makeStyles, Typography,
} from '@material-ui/core';
import React from 'react';
import NodeGraph from '../../assets/NodeGraph.png';
import './welcome.css';
import video from '../../assets/edit.mp4';

const Welcome = () => (
  <div>
    <section className="showcase">
      <video src={video} muted loop autoPlay />
      <div className="overlay" />
      <div className="text">
        <h1>Navigate your </h1>
        <h2>learning with maps</h2>
        <p>
          Create and progress through a subject map, all while recieving automated learning
          suggestions. Empower your learning with no added cost. Explore now!

        </p>
        <a href="/view">Explore</a>
      </div>
    </section>
  </div>
);

export default Welcome;
