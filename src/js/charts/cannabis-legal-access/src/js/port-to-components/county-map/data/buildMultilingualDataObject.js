export const buildMultilingualDataObject = ({
    countyStatusApi,
    countyStatus,
    rshoApi,
    rshoData
}) => {
    return  {
        "countystatus": {
            docs: countyStatusApi,
            data: countyStatus
        },
        "rsho": {
            docs: rshoApi,
            data: rshoData
        },
    };
}