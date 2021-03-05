import React from 'react';
import ReactDOM from 'react-dom';
// import PositionSelect from '../components/contacts';
import PositionSelect from '../index';

import {spaceTree, spaceTree2, space3, initData, init2} from '../mockData';
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(<div className="App"
                     style={{ height: '100%'}}>
  <header className="App-header">
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
  </p>
  <div>
    {/*<PositionSelect spaceTree={space3} defaultValue={init2}  onChange={e=>console.log(e)} showPositionSelect={true}/>*/}
    <PositionSelect spaceTree={space3}
                    // defaultValue={{"id": 2, "name": "会议室区域", "parentId": 1}}
                    onChange={e => console.log(e)}
    />
  </div>
  <div style={{minHeight:'300px',background:'green'}}>
    abc
  </div>
</div>, document.getElementById('root'));
