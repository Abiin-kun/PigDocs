import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import init,{evaluate} from '../wasm/pig_lib'
import { useState } from 'react';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1>Playground</h1>
        <p>Note:- Functions That Write to Stdout Doesnt work here such as <code className='button button--primary'>puts()</code></p>
      </div>
    </header>
  );
}

export default function Home() {
  const [anses,setAnses] = useState(["PlayGround Initialized! Check Docs For examples"]);
  function get(line){
      init().then(() => {

      let ans = evaluate(line)
      setAnses([ans,...anses])
      console.log(anses)
      })
      var element = document.getElementsByClassName("Console");
      element.scrollTop = element.scrollHeight;
  }
const [c,setC] = useState();
  const {siteConfig} = useDocusaurusContext();
  return (
    
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        
        <div className={styles.Console}>
        
        <div className={styles.Results}>
        {anses.map(name => (<p className={styles.m}> {">"}{name}</p>))}
        </div>
        
        </div>
        <div className={styles.In}>
          <textarea className='input button--lg' cols="40" rows="2"onKeyDown={e => {if (e.key == "Enter"){get(c)}}} type='text'value={c} onChange={e => setC(e.target.value)} ></textarea>
          <button className="button button--primary button--lg"onClick={() => {get(c)}}>Run!</button>
        </div>
        </main>
      
    </Layout>
  );
}
