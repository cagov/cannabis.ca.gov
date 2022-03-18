import countyStatus from "./records/countystatus.json";
import countyStatusApi from "./api_templates/countystatus.api.json";

import rshoData from "./records/rsho.json";
import rshoApi from "./api_templates/rsho.api.json";

import { buildMultilingualDataObject } from "./../buildMultilingualDataObject";

export const data = buildMultilingualDataObject({
    countyStatusApi,
    countyStatus,
    rshoApi,
    rshoData,
});
