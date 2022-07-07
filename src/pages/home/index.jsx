import React from "react";
import Layout from "../../components/layout";
import WooferFeed from "../../components/woofer-feed";
import ReWoof from "../../components/re-woof";
import {HomePage} from "./style";
import {H_WOOF} from "../../utils/enum";

export default function Home() {

  return (
    <Layout>
      <HomePage>
        <div className="home-view" id="scrollableDiv">
          <WooferFeed>
            <>
              <div className="home-header">
                Home
              </div>
              <div className="home-banner">
                <ReWoof woofType={H_WOOF}/>
              </div>
            </>
          </WooferFeed>
        </div>
      </HomePage>
    </Layout>
  )
}
