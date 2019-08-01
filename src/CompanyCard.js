import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './CompanyCard.css';

const DEFAULT_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAADkklEQVR42u3bvU8TcRjAca/lrbwUokEHF3WTwYXBycnN0T/UlYnJCRIWhoYJu0AiiQaL5Sp9wSckDi6lAwe/+/H55MYbnl/5hmuT5xrXUIHGE6iAsBAWwkJYICyEhbBAWAgLYYGwEBbCAmEhLIQFwkJYCAuEhbAQFggLYSEspimvhvtHxzt7h1++HiR+xZAxagwsrNRdlIPdg06/HGyur7x+8TTxK4bs3wzcuxwIK2md7ulaa2FjpdVs1ODTiyFj1Bi40z0RVtLOznurrcV6zRwDx9jCStpwNG4URc2+ShfFaDwRFn4VgrAQFsICYSGs+vnR63/7/nPKFTfc5/3CykSv/PP5w/aUK264z/uFhUchCAthISwQFsJCWCAshFVv7dbi9Hdm2v/vNFd9v7Ay8ax9y3s7ccN93i8sPApBWAgLYYGwEBbCAmEhrHrzlo6wKuEtHWEhLIQFwkJYCAuEhbAQFgjrLnlLR1iV8JaOsBAWwgJhISyEBcJCWHVg511YlbDzLiyEhbBAWAgLYYGwEBbCggcIq7wa7h8d7+wdTl/fTuGKIWPUGHjGo9l5f7CwLsrB7kGnXw42129Z307hiiH7NwP3LgeznM7O+4OF1emerrUWNlZazUYNnsIxZIwaA3e6J55uSYd1dt5bTebf9Yxi4BhbK0mHNRyNG0VRs8+oKEbjiVb8KkRYCAuEhbD+yWBh3M57imFlsDBu592jEGEhLBAWwkJYICyEhbAgobAyWBi3855iWBksjNt59yhEWAgLhIWwEBYIi0cQlp13O++VsPNu5x2EhbAQFggLYSEsEBbCQlh3yc67nfdK2Hm38w7CQlgIC4SFsBAW1CEsO+923ith593OOwgLYSEsEBbCQlggLISFsO6SnXc775Ww827nHYSFsBAWCAthISyoQ1hVL3QnuPOe4BEyDKvqhe4Ed94TPIJHIR6FCAuEhbAQFggLYSEsyCesqhe6E9x5T/AIGYZV9UJ3gjvvCR7BoxCPQoQFtQxrfq45ub6u12cUA881GzkdIcOwNtfXfiezMzSjGPj5RjunI2QY1tarlxfl1Xm/HE8m6f89YsgYNQaOsXM6QoZhtZeXPm5vLS8tnf26Zcs2hSuGjFFj4Bg7pyPk+eW9tTD//u2bT+/fTd+yTeGKIWPUGDi/I/hViF+FICyEhbBAWAgLYYGwEBbCQlg+AoSFsBAWCAthISwQFsLisfoLOHVMC5daNyQAAAAASUVORK5CYII=";

class CompanyCard extends Component{
  render(){
      let { handle, name, description, logo_url } = this.props;
      
      
      if (logo_url === ""){
        logo_url = DEFAULT_IMG;
      }

      return(
        <div className="Card mx-auto mb-1">
          <Link to={`/companies/${handle}`}>
            <div className="card">
              <div className="card-body">
                <img src={logo_url} alt={name}/>
                <h5 className="card-title">{ name }</h5>
                <p className="card-text">{ description }</p>
              </div>
            </div> 
          </Link> 
        </div>
      )
    }
}

export default CompanyCard;


