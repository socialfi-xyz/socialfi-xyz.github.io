import React from "react";
import Layout from "../../components/layout";
import WooferFeed from "../../components/woofer-feed";
import ReWoof from "../../components/re-woof";
import {HomePage} from "./style";

export default function Home() {



  return (
    <Layout>
      <HomePage>
        <div className="home-view">
          <div className="home-header">
            Home
          </div>
          <div className="home-banner">
            <ReWoof woofType="woof"/>
          </div>
          <WooferFeed/>
        </div>
      </HomePage>
    </Layout>
  )
}
