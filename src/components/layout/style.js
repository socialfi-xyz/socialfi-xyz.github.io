import styled from "styled-components";

export const LayoutView = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.bg1};

  .layout-menu {
    display: flex;
    width: 305px;
    min-width: 305px;
    //padding-bottom: 30px;
    box-shadow: 1px 0px 15px rgba(25, 3, 69, 0.1);
    height: 100vh;
    background: ${({ theme }) => theme.bg1};

    .layout-menu-view {
      flex: 1;
      //border-radius: 10px;
      padding: 0 30px;

      .layout-logo {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px 0;

        img {
          width: 80px;
          height: 80px;
        }

        span {
          margin-top: 8px;
          font-style: normal;
          font-weight: 700;
          font-size: 32px;
          line-height: 44px;
          /* identical to box height */
          color: ${({ theme }) => theme.text1};
        }
      }

      .menu-item {
        height: 54px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        color: ${({ theme }) => theme.text2};
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: -0.01em;
        padding-left: 56px;
        margin-bottom: 20px;

        &.active {
          background: #1D9BF0;
          color: #ffffff;
        }

        img {
          width: 20px;
          height: 20px;
          margin-right: 16px;
        }
      }
    }
  }

  .layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    //padding: 0 30px 0 30px;
    overflow: hidden;

    .header-router-h5 {
      display: none;
    }

    .header {
      width: 100%;
      display: flex;
      height: 105px;
      padding: 20px 40px;
      align-items: center;

      .header-l {
        .layout-logo-h5 {
          display: none;
          align-items: center;

          img {
            width: 45px;
            height: 45px;
          }

          span {
            color: #FFFFFF;
            font-size: 18px;
            margin-left: 10px;
            font-weight: bold;
          }
        }
      }

      .header-center {
        flex: 1;
      }

      .header-r {
        display: flex;

        .header-connect-wallet {
          width: 196px;
          height: 41px;
          left: 1212px;
          top: 32px;
          background: ${({ theme }) => theme.primary1};
          border-radius: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 25px;
          /* identical to box height */
          color: #FFFFFF;
          cursor: pointer;
        }
        .theme-switch{
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: ${({ theme }) => theme.primary1};
          margin-left: 16px;
          cursor: pointer;
        }

        .header-lan-btn {
          width: 66px;
          height: 34px;
          background: #FFFFFF;
          border-radius: 17px;
          margin-left: 20px;

          img {
            width: 30px;
            height: 16px;
          }
        }
      }
    }

    .layout-content {
      flex: 1;
      display: flex;
      overflow-y: auto;

      .layout-content-page {
        flex: 1;
        padding: 0 20px 30px 40px;
        overflow-y: auto;
      }
    }
  }

  @media (max-width: 1000px) {

    .layout-menu {
      width: 180px;
      min-width: 180px;
      display: none !important;

      .layout-menu-view {
        padding: 20px;

        .menu-item {
          height: 45px;
          font-size: 14px;
          padding-left: 10px;

          img {
            width: 18px;
            height: 18px;
            margin-right: 10px;
          }
        }
      }
    }

    .layout-main {
      //padding: 0 10px 0 10px;
      .header {
        height: 80px;
        padding: 10px 20px;

        .header-l {
          .header-router-pc {
            display: none;
          }

          .layout-logo-h5 {
            display: flex;

            img {
              width: 45px;
              height: 45px;
            }
          }
        }
      }

      .header-router-h5 {
        display: flex;
        align-items: center;
        padding-bottom: 10px;

        .menu-item {
          min-width: 105px;
          padding: 0 10px;
          background: #373951;
          height: 34px;
          box-shadow: 0px 21px 94px rgb(0 0 0 / 3%);
          border-radius: 17px;
          margin-left: 10px;
          color: #ffffff;
          font-style: normal;
          font-weight: bold;

          &.active {
            background: #EDF4FF;
            color: #1D9BF0;
          }
        }
      }

      .layout-content {
        .layout-content-page {
          padding: 0 10px 30px 10px;
        }
      }
    }

  }
  @media (max-width: 750px) {

    .layout-menu {
      display: none !important;
    }

    .layout-main {
      padding: 0 10px 0 10px;

      .header {
        padding: 20px;

        .header-r {
          .header-connect-wallet {
            white-space: nowrap;
            width: 115px !important;
            height: 36px !important;
            font-size: 14px !important;
          }
        }
      }
    }
  }
  @media (max-width: 450px) {
    .layout-main {
      padding: 0;

      .header {
        padding: 10px;

        .header-l {
          .header-router {
            .menu-item {
              width: auto;
              min-width: 60px;
              padding: 0 10px;
            }
          }
        }
      }
    }
  }


`
