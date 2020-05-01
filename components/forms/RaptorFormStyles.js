import styled from "styled-components";

export const TH = styled.th`
  padding: 0.75em;
  height: 100%;
  border-collapse: collapse;
  border-bottom: 2px solid;
`;

export const TR = styled.tr`
  background-color: gray
`;

export const TD = styled.td`
  border-top: 1px solid #dee2e6;
  text-align: center;
  padding: 8px;
`;

export const Table = styled.table`
  table-layout: fixed;
  font-weight: 400;
  border-collapse: collapse;
  width: 100%;
  display: table;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  width: 100%;
  height: 100%;
`;

/*
export const Table = styled.table`
  table-layout: fixed;
  font-weight: 400;
  border-collapse: collapse;
  width: 100%;
  display: table;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  color: ${props => {
    switch (props.theme) {
      case "dark":
        return "white";
      default:
        return "black";
    }
  }};
  height: ${props => {
    switch (props.density) {
      case "low":
        return "90vh";
      case "avg":
        return "45vh";
      case "high":
        return "5px";
      default:
        return "50vh";
    }
  }};
`;*/