import { Card, Grid, styled, useTheme } from "@mui/material";
import { Fragment } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { size } from "lodash";

const Analytics = () => {
  
  function Card(props) {
    return (
      <div className="card">
        <img className="card-img-top" src="/assets/images/illustrations/examshedule.png" alt={props.title} />
      </div>
    );
}

function Card1(props) {
  return (
    <div className="card">
      <img className="card-img-top"  
      src="/assets/images/illustrations/examresult.png" />
    </div>
  );
}
function Card2(props) {
  return (
    <div className="card">
      <img className="card-img-top"  
      src="/assets/images/illustrations/rule.png" />
    </div>
  );
}



  const { palette } = useTheme();

  return (
    <Fragment>
      <div className="row m-0 my-2">
      <div className="col-2">
      <Card
        />
      </div>
      <div className="col-2">
      <Card1
        />
      </div>
      <div className="col-2">
      <Card2
        />
      </div>
      <div className="col-2">
      <Card1
        />
      </div>
      </div>

     

    </Fragment>
  );
};

export default Analytics;
