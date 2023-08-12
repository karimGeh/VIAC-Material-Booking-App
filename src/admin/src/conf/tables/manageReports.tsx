import { ReportHistory } from "api/ReportHistory";
import { dateFormatter } from "utils/formatters/dateFormatter";

export interface ManageReportsTableColumns {
  title: string;
  dataIndex?: keyof ReportHistory;
  alignment?: "left" | "right" | "center";
  sortId?: number;
  render?: (value: string) => string | JSX.Element;
}

export const manageReportsTableColumns: ManageReportsTableColumns[] = [
  { title: "Select", alignment: "center" },
  { title: "Tax Year", dataIndex: "taxYear", sortId: 1, alignment: "right" },
  { title: "Company", dataIndex: "companyName", sortId: 2 },
  { title: "State", dataIndex: "stateCode", sortId: 3 },
  { title: "Report Category", dataIndex: "reportCategory" },
  { title: "Version", dataIndex: "versionDescription" },
  {
    title: "Last downloaded",
    dataIndex: "lastDownloadedDate",
    render: (date: string) => (
      <div className="dateWrapper">{date ? dateFormatter(date) : "-"}</div>
    ),
  },
  { title: "Created by", dataIndex: "createdUser", sortId: 7 },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    sortId: 8,
    render: (date: string) => (
      <div className="dateWrapper">{date ? dateFormatter(date) : "-"}</div>
    ),
  },
  { title: "Report", dataIndex: "reportRequestId" },
  { title: "Options", alignment: "center" },
];
