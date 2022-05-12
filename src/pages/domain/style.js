import styled from 'styled-components'

import BgDark from '../../assets/images/domain/bg_dark.svg'
import BgLight from '../../assets/images/domain/bg_light.svg'
import FooterDarkBg from '../../assets/images/domain/footer-bg_dark.svg'
import FooterLightBg from '../../assets/images/domain/footer-bg_light.svg'

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
          color: ${({ theme }) => theme.text1};
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
        color: ${({ theme }) => theme.text4};
        max-width: 440px;
      }

      h2 {
        font-style: normal;
        font-weight: 600;
        font-size: 50px;
        line-height: 57px;
        color: ${({ theme }) => theme.text3};

        span {
          color: ${({ theme }) => theme.primary1};
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
        .domain-banner-img-c{
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
    background: url(${(props) => props.darkMode ? FooterDarkBg : FooterLightBg});
    background-size: 100% 100%;
    height: 380px;
    text-align: center;
    margin-top: 80px;

    img {
      max-width: 1300px;
      max-height: 100%;
    }
  }

  .domain-footer {
    background: ${({ theme }) => theme.bg3};
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
      color: ${({ theme }) => theme.text5};
      opacity: 0.3;
      margin-top: 42px;
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

      img {
        max-width: 90%;
        max-height: 100%;
      }
    }
  }
  @media (max-width: 800px) {

    .domain-footer-img {
      margin-top: 30px;
      height: 180px;
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

    .domain-footer-img {
      height: 150px;
      margin-top: 10px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

`
