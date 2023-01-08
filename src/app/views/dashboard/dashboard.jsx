import { Card, Grid, styled, useTheme } from "@mui/material";
import { Fragment } from "react";
import './card.css'
const Analytics = () => {
  
  function Card(props) {
    return (
      <div className="card">
        <img className="card-img-top" src={props.featureImage} alt={props.title} />
      </div>
    );
}
function Card1(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.second} alt={props.title} />
    </div>
  );
}
function Card2(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.second} alt={props.title} />
    </div>
  );
}
function Card3(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.second} alt={props.title} />
    </div>
  );
}


  const { palette } = useTheme();

  return (
    <Fragment>
      <div className="row m-0">
      <div className="col-4">
      <Card
          featureImage="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
        />
      </div>
      <div className="col-4">
      <Card1
          second="https://images.wallpaperscraft.com/image/single/black_light_dark_figures_73356_300x168.jpg"
        />
      </div>
      <div className="col-4">
      <Card2
          second="https://images.wallpaperscraft.com/image/single/black_light_dark_figures_73356_300x168.jpg"
        />
      </div>
      </div>

      <div className="row m-0">
      <div className="col-4">
      <Card3
          second="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
        />
      </div>
      
      </div>

    </Fragment>
  );
};

export default Analytics;
