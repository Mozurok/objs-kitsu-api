import React from 'react'
import loaderSpin from "./loader.png";
import './styles.css'

function LoadingSpin() {
  return (
    <div style={{width: '100%', textAlign: 'center'}}><img className={'imgSpinLoader'} src={loaderSpin}
                                                           alt={'loader spin'}/></div>
  );
}

export default LoadingSpin