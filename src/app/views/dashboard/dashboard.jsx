import { Card, Grid, styled, useTheme } from "@mui/material";
import { Fragment } from "react";
import './card.css'
const Analytics = () => {
  
  function Card(props) {
    return (
      <div className="card">
        <img className="card-img-top" src={props.featureImage} alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <a href={props.link} className="btn btn-primary">Learn more</a>
        </div>
      </div>
    );
}

  const { palette } = useTheme();

  return (
    <Fragment>
      <div className="row m-0">
      <div className="col-3">
      <Card
          featureImage="https://images.wallpaperscraft.com/image/single/black_light_dark_figures_73356_300x168.jpg"
          title="How To Make Interactive ReactJS Form"
          description="Let's write some interactive form with React"
          link="https://sebhastian.com/interactive-react-form"
        />
      </div>
      </div>

    </Fragment>
  );
};

export default Analytics;
