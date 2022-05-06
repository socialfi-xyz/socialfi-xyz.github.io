import React, {useMemo, useState} from "react";
import Layout from "../../components/layout";
import './index.less'
import WooferFeed from "../../components/woofer-feed";
import ReWoof from "../../components/re-woof";

export default function Home() {



  return (
    <Layout>
      <div className="home-page layout-content-page custom-scroll">
        <div className="home-header">
          Home
        </div>
        <div className="home-banner">
          <ReWoof woofType="woof"/>
        </div>
        <WooferFeed/>
      </div>
    </Layout>
  )
}
