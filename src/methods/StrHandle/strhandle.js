function TimeFormat(str) {
    var strarray=str.split('T');
    var strarray1=strarray[1].split('+');
    return strarray[0]+' '+strarray1[0];
}