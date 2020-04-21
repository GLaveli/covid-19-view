import React, { useEffect, useState } from 'react';
import api from '../../api/index';

import './styles.css';

import loading from '../../assets/loading.gif';

export default function Index() {
  const [showData, setShowData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [count, setCount] = useState(0);

  const [cases, setcases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [refuses, setRefuses] = useState(0);
  const [suspects, setSuspects] = useState(0);



  useEffect(() => {
    async function loadRegions() {
      const response = await api.get('/brazil');
      const { values } = response.data;
      setShowData(values);
      let countAux = 0;
      let casesCount = 0;
      let deathsCount = 0;
      let refusesCount = 0;
      let suspectsCount = 0;
      values.forEach((element, i) => {
        countAux = i;
        casesCount += element.cases;
        deathsCount += element.deaths;
        refusesCount += element.refuses;
        suspectsCount += element.suspects;

      });
      setFlag(true);
      setCount(countAux + 1);
      setcases(casesCount);
      setDeaths(deathsCount);
      setRefuses(refusesCount);
      setSuspects(suspectsCount);

    };

    loadRegions();
  }, []);

  return (
    <div className="brasilContainer">

      <h1 className="title">Fluxo de informaçoes referentes ao COVID-19 no Brasil</h1>

      <section className="flex">
        <div>
          <ul>
            <li className="textContentNumbers suspeitas">{suspects}</li>
            <li className="textContentTitle">Suspeitas</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="textContentNumbers casos">{cases}</li>
            <li className="textContentTitle">Casos</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="textContentNumbers curados">{refuses}</li>
            <li className="textContentTitle">Curados</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="textContentNumbers mortes">{deaths}</li>
            <li className="textContentTitle">Mortes</li>
          </ul>
        </div>
      </section>

      <section className="cardContainer">
        <h1 className="cardTitle">{count} estados com informaçôes relevantes</h1>
        {flag ? <div>
          {
            showData.map((coronga) => (


              <div className="card" key={coronga.uid}>

                <span className="contentCity ">{coronga.state}</span>

                <span className="textSuspects suspeitas">{coronga.suspects}</span>
                <span className="contentSuspects ">Suspeita</span>

                <span className="textCases casos">{coronga.cases}</span>
                <span className="contentCases">Casos</span>

                <span className="textCurados curados">{coronga.refuses}</span>
                <span className="contentRefused">Curados</span>

                <span className="textMortes mortes">{coronga.deaths}</span>
                <span className="contentDeaths">Mortes</span>

              </div>

            ))
          }
        </div>
          :
          <div>
            <img src={loading} alt="loading" />
          </div>
        }
      </section>
    </div>
  )

}
