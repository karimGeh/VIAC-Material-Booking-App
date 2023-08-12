import { QuickSearchOption } from "api/AdvancedSearchAPI";

export const quickSearchDecoder = (option: QuickSearchOption): string => {
  switch (option.description) {
    // only cases that are different from the description
    case "Version":
      return "ReportVersion";
    case "GISLocation":
      return "GIS_Location";
    case "GL Account":
      return "GLAccount";
    case "State Code":
      return "StateCode";
    case "Utility Account":
      return "Utility_Account";

    default:
      return option.description;
  }
};
