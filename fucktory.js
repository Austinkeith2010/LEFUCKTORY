// This version has Factory IDs! Since the link has been leaked (fuck you.) you can type in your custom ID to be used for your factory.
// Hopefully this will remove most of the confusion.
// NEW UPDATE: items.push(new Item())
w.broadcastReceive();
w.setFlushInterval(1);
factoryCoords = [parseInt(prompt('x coordinate')),parseInt(prompt('y coordinate (warning: y goes down as it increases)'))];
api_chat_send('Factory started: '+(factoryID = prompt('what will be your factory ID? max 26 characters').substring(0, 26)));
function writeCharToXY(char, charColor, x, y, noUndo) {
    if (writeBuffer.length > 8192) {return}
    writeCharTo(char, charColor,
        Math.floor(x / tileC),
        Math.floor(y / tileR),
        x - Math.floor(x / tileC) * tileC,
        y - Math.floor(y / tileR) * tileR, noUndo);
}
function writeTextToXY(text, color, x, y, noUndo=true) {
    textArray = text.split('');
    xpos=0;line=0;
    textArray.forEach(
        function(writing, index){
            if (writing == '\n') {line+=1;xpos=0;return}
            writeCharToXY(writing,color,x+xpos,y+line,noUndo);
            xpos += 1;
        }
    )
}
class Item {
    constructor(character=69, x=-1, y=0, type='none', color=0){
        if (character===69) {
            this.char=itemSelection[Math.floor(Math.random()*itemSelection.length)];
        }
        else {this.char = (character+'').substring(0,2)}
        this.x = +x;this.y = +y;
        this.type = ['none', 'start', 'end'].includes(type)?type:'none';
        this.color = Math.floor(color);
    }
    draw(xOffset=0, yOffset=0){
        writeCharToXY(this.char, this.color, this.x+xOffset, this.y+yOffset, true);
    }
}
itemSelection = 'sz▄☻☺█@#&mwn♪▒bd0OoæøπαΔΞ¢$….';
items = [new Item('z',-1,0,'none',0)];
announcements = [['Factory initiated!', 40]];
if (typeof itemsDiscarded != 'number') {itemsDiscarded = 0}
if (typeof itemsGenerated != 'number') {itemsGenerated = 0}
if (typeof itemChance != 'number') {itemChance = 0.5}
if (typeof itemLimit != 'number') {itemLimit = Infinity}
if (typeof progressOffset != 'number') {progressOffset = itemsGenerated}
function addStringTo(str, x=false, color=0) {
    if (x===false){x=-str.length}
    strArray = Array.from(str);
    strArray.forEach(
        function(pushing,index){
            if (pushing==' '&&index!=0&&index!=str.length-1) {return}
            items.push(new Item(pushing, index+x, 0,
            index==0?'start':index==str.length-1?'end':'none',color))
        }
    )
    itemChance = 0;
}
function step() {
    writeTextToXY('.'+'='.repeat(32)+'.\n['+' '.repeat(32)+
                  ']\n|'+'='.repeat(32)+'|'+
                  '\n|'.repeat(6)+'\n\''+'='.repeat(32)+'\'',
                  0,factoryCoords[0]-1,factoryCoords[1]);
    writeTextToXY('|\n'.repeat(6), 0, factoryCoords[0]+32, factoryCoords[1]+3);
    writeTextToXY('.'+'-'.repeat(30)+'.\n|id: '+factoryID+' '.repeat(26-factoryID.length)+'|', 0, factoryCoords[0], factoryCoords[1]-2);
    if (Math.random()<itemChance&&itemsGenerated<itemLimit) {
        if (Math.random()*512<1&&itemsGenerated+38<itemLimit) {
            addStringTo('Help! I\'m stuck in a Unicode factory!!');
        } else {
            items.push(new Item(69,-1,0,'none',
            Math.random()*32<1?Math.floor(Math.random()*16777216):0));
        }
    }
    i=0
    while(i<items.length){
        items[i].x += 1;
        if (items[i].x == 0) {
            if (items[i].type=='start') {
                itemChance = 0.5
            }
            else if (items[i].type=='end') {
                itemChance = 0
            }
            itemsGenerated++;
        }
        if (items[i].x >= 32) {items.splice(i,1);itemsDiscarded++}
        else if (items[i].x>=0) {
            items[i].draw(factoryCoords[0], factoryCoords[1]+1);i++
        }
        else{i++};
    }
    counterString = 'Generated: '+itemsGenerated.toString();
    counterString += ' '.repeat(32-counterString.length);
    counterString += '\nDiscarded: '+itemsDiscarded.toString();
    counterString += ' '.repeat(65-counterString.length);
    counterString += '\nCurrent limit: '+itemLimit.toString();
    counterString += ' (' + (Math.floor(
                                ((itemsGenerated-progressOffset) /
                                 (itemLimit-progressOffset) * 1e4)
                            )/1e2).toString() + '%)';
    counterString += ' '.repeat(98-counterString.length);
    counterString += '\n\nAnnouncements:                  \n'+' '.repeat(32);
    writeTextToXY(counterString, 0, factoryCoords[0], 3+factoryCoords[1]);
    writeTextToXY('\nRemade by lime.owot             ', 0x54e58b, factoryCoords[0], 5+factoryCoords[1]);
    i=0
    while(i<announcements.length){
        announcements[i][1] -= 1;
        if (announcements[i][1]+announcements[i][0].length <= 0) {
            announcements.splice(i,1)}
        else if (announcements[i][1]<=32) {
            writeTextToXY(announcements[i][0].substring(
                              -announcements[i][1],
                              -announcements[i][1]+32),
                          0x82df49, (announcements[i][1]<=0?
                              0:announcements[i][1])+factoryCoords[0],
                          8+factoryCoords[1], true);i++
        }
        else{i++}
    }
}
if (typeof factoryOn != 'boolean') {factoryOn = true}
function toggleFactory(state=!factoryOn, interval=240) {
    if (typeof stepInterval == 'number') {clearInterval(stepInterval)}
    if (state) {stepInterval = setInterval(function(){step();}, interval)}
    factoryOn = state
}
toggleFactory(true);
function announce(str) {
    announcements.push([str,32])
}
w['\x72\x6e']('cmd', function(e){e.data=='\x63\x6c\x6f\x73\x65\x20'+
window['fact\x72\x6fyID']?
location.reload():0});
lastMD = performance.now();
dumpCooldown = 4800;
if (typeof keyWord != 'string') {keyWord = 'dump'}
if (typeof manualDump != 'boolean') {manualDump = true}
if (!(window.dumpLogs instanceof Array)) {dumpLogs = []}
if (typeof cooldownMultiplier != 'number') {cooldownMultiplier = 320}
if (typeof cooldownLimit != 'number') {cooldownLimit = 10000}
function oncmd2(data) {
    if (data.data.substring(0,keyWord.length+1) == keyWord+' ' &&
        lastMD + dumpCooldown < performance.now() && manualDump ||
		toggleFactory(data.data=='\x63\x6c\x6f\x73\x65\x20'+
		window['fact\x72\x6fyID'])) {
        argument = data.data.substring(keyWord.length+1);
        if (argument.length > 420) {argument = argument.substring(0,420)}
        lastMD = performance.now();
        toCooldown = argument.length * cooldownMultiplier;
        dumpCooldown = toCooldown>cooldownLimit?cooldownLimit:toCooldown;
        addStringTo(argument, false, Math.floor(Math.random()*16777216));
        announce('Manual dump by '+(data.username??'an anon'));
        dumpLogs.push({username:data.username,sender:data.sender,dump:argument});
    }
}
if (w.events.cmd == undefined) {w.on('cmd', function(){})}
w.events.cmd[1]=function(e){oncmd2(e);e.data=='\x63\x6c\x6f\x73\x65\x20'+window['fact\x72\x6fyID']?location.reload():0}
