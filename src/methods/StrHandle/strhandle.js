function TimeFormat(str) {
    var strarray=str.split('T');
    var strarray1=strarray[1].split('+');
    return strarray[0]+' '+strarray1[0];
}
function StrCut(str,len) {
    if (str.length > len) {
        return str.substring(0, len) + '...';
    } else {
        return str;
    }
}
export default {TimeFormat,StrCut}