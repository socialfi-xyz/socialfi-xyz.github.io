import styled from "styled-components";

export const GetRewardsModalView = styled.div`
  .rewards-item{
    color: ${({ theme }) => theme.text1};
    display: flex;
    font-size: 14px;
    margin: 12px 0;
    p{
      padding-right: 8px;
      width: 130px;
    }
    div{
      flex: 1;
    }
    button{
      border-radius: 8px;
    }
  }
`
