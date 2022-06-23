import styled from 'styled-components'

import BgDark from '../../assets/images/domain/bg_dark.svg'
import BgLight from '../../assets/images/domain/bg_light.svg'


export const DomainPage = styled.div`
  background: #363636;
  min-height: 100vh;
  background: url(${(props) => props.darkMode ? BgDark : BgLight});
  background-size: cover;
  display: flex;
  flex-direction: column;

  .domain-header {
    width: 100%;
    height: 85px;
    //background: url("../../assets/images/domain/header-bg.png") repeat-x;
    background-size: auto 100%;

    .domain-header-c {
      max-width: 1300px;
      margin: auto;
      display: flex;
      padding-top: 40px;

      & > div {
        display: flex;
        align-items: center;

        &.domain-logo {
          flex: 1;
          line-height: 22px;
          color: ${({theme}) => theme.text1};
          font-style: normal;
          font-weight: 600;
          font-size: 24px;

          & > img {
            width: 40px;
            height: 40px;
            margin-right: 9px;
          }
        }
      }
    }
  }

  .domain-banner {
    width: 100%;
    flex: 1;
    display: flex;
    padding-top: 77px;
    max-width: 1300px;
    margin: auto;

    .domain-banner-title {
      //flex: 1;
      p {
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 30px;
        color: ${({theme}) => theme.text4};
        max-width: 440px;
      }

      h2 {
        font-style: normal;
        font-weight: 600;
        font-size: 50px;
        line-height: 57px;
        color: ${({theme}) => theme.text3};

        span {
          color: ${({theme}) => theme.primary1};
        }
      }
    }

    .domain-banner-img {
      flex: 1;
      display: flex;
      justify-content: center;

      div {
        position: relative;
        padding: 25px;
        width: 346px;
        height: 346px;

        .domain-banner-img-c {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .domain-banner-img-bg {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .domain-footer-img {
    background-size: 100% 100%;
    max-height: 380px;
    text-align: center;
    margin-top: 80px;

    img {
      width: 100%;
      display: block;
    }
  }

  .domain-footer {
    background: ${({theme}) => theme.bg3};
    flex-direction: column;
    padding: 48px;

    .links {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }

    & > p {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      /* identical to box height, or 150% */
      text-align: center;
      color: ${({theme}) => theme.text5};
      opacity: 0.3;
      margin-top: 42px;
    }
  }

  .what-woofer {
    position: relative;
    background: ${({ theme }) => theme.bg6};
    .box-show-lt{
      position: absolute;
      width: 680px;
      height: 680px;
      left: -347px;
      top: -306px;

      background: ${({ theme }) => theme.bg7};
      opacity: 0.2;
      filter: blur(281.739px);
    }
    .what-woofer-title {
      display: block;
      height: 40px;
      margin: 140px auto 0 auto;
    }
      .what-woofer-card-b{
        width: 1024px;
        max-width: 96vw;
        padding: 2px;
        border-radius: 24px;
        background: ${({ theme }) => theme.bg8};
        box-shadow: 0px 15px 37px ${({ theme }) => theme.shadow2};
        margin: 60px auto 0 auto;
        .what-woofer-card-m{
          border-radius: 24px;
          background: ${({ theme }) => theme.cardBg1};
      }
    }
    .what-woofer-card {
      position: relative;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.bg5};
      padding: 72px 53px;
      display: flex;
      align-items: center;
     
      border-radius: 24px;
      .what-woofer-card-icon{
        min-width: 270px;
        height: 270px;
        margin-right: 48px;
        img{
        width: 100%;
          height: 100%;
        }
      }
      .what-woofer-card-desc{
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        text-align: justify;
        color: ${({ theme }) => theme.text8};
      }
      .what-woofer-icon-rb{
        position: absolute;
        right: 0px;
        bottom: 0;
        width: 242px;
        height: 146px;
      }
    }
    
  }
  .how-woofer-main{
    width: 100%;
    overflow: hidden;
    position: relative;

    .how-woofer-r-b{
      position: absolute;
      right: -391px;
      bottom: -200px;
      width: 782px;
      height: 782px;

      background: #1D9BF0;
      opacity: 0.05;
      filter: blur(324px);
    }
    .how-woofer{
      max-width: 96vw;
      width: 1024px;
      margin: auto;
      .how-woofer-title {
        display: block;
        height: 40px;
        margin: 140px auto 0 auto;
      }
      .how-woofer-box{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 60px 0 140px 0;
        grid-column-gap: 20px;
        .how-woofer-box-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 35px;
          background: ${({ theme }) => theme.bg9};
          border-radius: 16px;
          box-shadow: 0px 15px 37px rgba(0, 0, 0, 0.03);
          .item-icon{
            width: 120px;
            height: 120px;
          }
          h1{
            margin: 24px 0 16px 0;
            font-weight: 600;
            font-size: 32px;
            line-height: 48px;
            text-align: center;
            color: ${({ theme }) => theme.text10};
          }
          p{
            font-weight: 500;
            font-size: 18px;
            line-height: 27px;
            color: ${({ theme }) => theme.text11};
            margin: 0;
            text-align: center;
          }
          .arrow-down{
            width: 12px;
            height: 28px;
          }
        }
      }
  }
}

  .domain-banner-btn {
    display: flex;

    .domain-page-enter-app {
      width: 130px;
      height: 35px;
      background: #1D9BF0;
      border-radius: 5px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #FFFFFF;
    }

    .claim-airdrop-btn {
      width: 142px;
      margin-left: 30px;
    }
  }

  @media (max-width: 1300px) {

    .domain-header {
      padding: 0 40px;
    }

    .domain-banner {
      padding: 77px 40px 0 40px;
    }
  }
  @media (max-width: 1160px) {
    .domain-banner {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .domain-banner-img {
        margin: 20px;

        div {
          width: 260px;
          height: 260px;

          img {
            width: calc(100% - 20px);
            height: calc(100% - 20px);
          }
        }
      }
    }

    .domain-footer-img {
      margin-top: 60px;
    }
  }
  @media (max-width: 800px) {

    .domain-footer-img {
      margin-top: 30px;
    }

    .what-woofer {
      .what-woofer-title {
        height: 30px;
        margin: 60px auto 0 auto;
      }

      .what-woofer-card-b {
        border-radius: 16px;
        margin: 60px auto 0 auto;
        .what-woofer-card-m{
          border-radius: 16px;
        }
      }

      .what-woofer-card {
        padding: 20px 20px;
        border-radius: 16px;

        .what-woofer-card-icon {
          min-width: 220px;
          height: 220px;
          margin-right: 28px;
        }

        .what-woofer-card-desc {
          font-size: 16px;
          line-height: 20px;
        }

        .what-woofer-icon-rb {
          position: absolute;
          right: 0px;
          bottom: 0;
          width: 162px;
        }
      }
    }
    .how-woofer {

      .how-woofer-title {
        height: 30px;
        margin: 60px auto 0 auto;
      }
    }
  }
  @media (max-width: 450px) {
    .domain-header {
      height: 80px;
      padding: 0 10px;

      .domain-banner-img {
        margin: 20px;
      }

      .domain-header-c {
        padding-top: 20px;

        & > div {
          &.domain-logo {

            & > img {
              width: 46px;
              height: 46px;
              margin-right: 3px;
            }
          }
        }
      }

      .domain-page-enter-app {
        white-space: nowrap;
        width: 110px !important;
        padding: 0 5px !important;
        font-size: 14px !important;
      }

      .claim-airdrop-btn {
        width: 90px !important;

      }
    }

    .domain-banner {
      padding: 50px 20px 0 20px;
    }
    .what-woofer {
      .what-woofer-title {
        height: 15px;
        margin: 60px auto 0 auto;
      }
      .what-woofer-card-b{
        border-radius: 16px;
        margin: 40px auto 0 auto;
        height: auto;
        .what-woofer-card-m{
          border-radius: 16px;
        }
      }
      .what-woofer-card {
        padding: 10px 10px;
        border-radius: 16px;
        flex-direction: column;
        height: auto;
        padding-bottom: 50px;
        .what-woofer-card-icon{
          min-width: 220px;
          height: 220px;
          margin-right: 28px;
        }
        .what-woofer-card-desc{
          font-size: 16px;
          line-height: 20px;
        }
        .what-woofer-icon-rb{
          position: absolute;
          right: 0px;
          bottom: 0;
          width: 162px;
        }
      }
    }

    .domain-footer-img {
      margin-top: 10px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .how-woofer{
      
      .how-woofer-title {
        height: 15px;
        margin: 60px auto 0 auto;
      }
      .how-woofer-box{
        grid-template-columns: 1fr;
        margin: 40px auto 60px auto;
        grid-row-gap: 20px;
        .how-woofer-box-item{
          max-width: 98vw;
          padding: 22px 25px;
          border-radius: 16px;
          .item-icon{
            width: 90px;
            height: 90px;
          }
          h1{
            margin: 18px 0 16px 0;
            font-size: 20px;
            line-height: 38px;
          }
          p{
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
          }
          .arrow-down{
            width: 12px;
            height: 28px;
          }
        }
      }
    }
  }

`
