import { NBVObjectType } from "api/PipelineNBV";

export interface NBVTableColumnType {
  title: string;
  dataIndex?: keyof NBVObjectType;
  sortId?: number;
  alignment?: "left" | "right" | "center";
  render?: (value: string) => string | JSX.Element;
}

export const NBVTableColumns: NBVTableColumnType[] = [
  { title: "Select", alignment: "center" },
  { title: "Tax Year", dataIndex: "taxYear", sortId: 1, alignment: "right" },
  { title: "Segment", dataIndex: "segment", sortId: 2 },
  { title: "Company", dataIndex: "companyName", sortId: 3 },
  {
    title: "Company Code",
    dataIndex: "companyCode",
    sortId: 4,
    alignment: "right",
  },
  { title: "GIS Location", dataIndex: "giS_Location", sortId: 5 },
  { title: "GL Account", dataIndex: "gL_Account", sortId: 6 },
  { title: "State Code", dataIndex: "stateCode", sortId: 7 },
  { title: "Vintage", dataIndex: "vintage", sortId: 8, alignment: "right" },
  { title: "Utility Account", dataIndex: "utility_Account", sortId: 9 },
  { title: "Options", alignment: "center" },
];
