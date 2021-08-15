let grid=document.querySelector(".grid");
let leftCol=document.querySelector(".left-col");
let topRow=document.querySelector(".top-row");
let addressInput=document.querySelector(".address-input");
let boldBtn=document.querySelector(".bold");
let underlineBtn=document.querySelector(".underline");
let italicBtn=document.querySelector(".italic");
let formulaBar=document.querySelector(".formula-input");
let fontSizeElem = document.querySelector(".font-size");
let fontFamilyElem = document.querySelector(".font-family");
let alignBtns = document.querySelectorAll(".align-container>*");
let color=document.querySelector(".color");
let BgColor=document.querySelector(".bg-color");
let add_btn=document.querySelector(".add-sheet_btn-container");
let sheetList=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
let allSheets = document.querySelectorAll(".sheet");
let sheetArray = [];
let rows=100;
let cols=26;
//rows 1 2 3.......100

console.log(alignBtns.length)
for(let i=0;i<rows;i++){
    let colBox=document.createElement("div");
    colBox.innerText=i+1;
    colBox.setAttribute("class","box");
    leftCol.appendChild(colBox);
}
//columns a b c d........
for(let i=0;i<cols;i++){
    let cell=document.createElement("div");
    cell.innerText=String.fromCharCode(65 + i);
    cell.setAttribute("class", "cell");
    topRow.appendChild(cell);
}

//2D grid
for(let i=0;i<rows;i++){
    let row=document.createElement("div");
    row.setAttribute("class","row");
    for(let j=0;j<cols;j++){
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        //cell.innerText=`${String.fromCharCode(65+j)} ${i+1}`;
        //make div editable
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }
    grid.appendChild(row);
}

// sheets aray -> bottom 

let sheetDB=[];


//to change the active 
//status we need first sheet also so that first sheet can  be made active
firstSheet.addEventListener("click",makeMeActive);
firstSheet.click();

//add_btn to add new sheet 
add_btn.addEventListener("click",function(){
    let allSheets = document.querySelectorAll(".sheet");
    //console.log(allSheets.length);
    let lastSheet = allSheets[allSheets.length-1];
    //console.log(lastSheet);
    let Lastidx = lastSheet.getAttribute("idx");
    Lastidx = Number(Lastidx);
    //console.log(Lastidx)
    let Newsheet = document.createElement("div");
    Newsheet.setAttribute("class", "sheet");
    Newsheet.setAttribute("idx", `${Lastidx + 1}`);
    Newsheet.innerText = `Sheet ${Lastidx + 2}`;
    sheetList.appendChild(Newsheet);
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    Newsheet.classList.add("active");
    // new sheet create 
    createSheet();
    // 3d array -> sheetDB
    // current db sheet change
    sheetDB = sheetArray[Lastidx+1];
    // adding event listener to new sheets
    setUI(sheetDB);
   // console.log(sheetDB);
    Newsheet.addEventListener("click", makeMeActive);
})
//any  sheet which has active status will be inactive
// and clicked sheet will be active
function makeMeActive(e){
    let sheet=e.currentTarget; 
    let allSheets=document.querySelectorAll(".sheet");
    for(let i=0;i<allSheets.length;i++){
        //console.log("remove")
        allSheets[i].classList.remove("active");
       // console.log(allSheets[i].classList)
    }
    sheet.classList.add("active");
   
    let idx=sheet.getAttribute("idx");
    if(!sheetArray[idx]){
        // when new sheet is created
        createSheet();
    }
    sheetDB=sheetArray[idx];
    // console.log(sheetArray);
    // console.log(sheetDB);
    setUI(sheetDB);
}
//to show active we make the sheets background white
//one sheet can be active at a time so make all other sheets inactive(remove active class)
//if new sheet is added make that sheet active
// and first sheet is active by default
//so eventListener is added to first sheet also***
function createSheet(){
    let NewDB = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let cell = {
                bold: "normal"
                , italic: "normal",
                underline: "none", hAlign: "center",
                fontFamily: "sans-serif"
                , fontSize: "16",
                color: "black",
                backgroundColor: "white",
                value: "",
                formula: "",
                children: []
            }
            let elem = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            elem.innerText = "";
            row.push(cell);
        }
        NewDB.push(row);
    }
    sheetArray.push(NewDB);
}


function setUI(sheetDB) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let elem = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            let cellInfo = sheetDB[i][j];
            //console.log(cellInfo);
            if(cellInfo.value){
                elem.innerText = cellInfo.value;
            }else{
                elem.innerText=""
            }  
            elem.style.fontStyle=cellInfo.italic; 
            elem.style.color=cellInfo.color;
            elem.style.fontWeight=cellInfo.bold; 
            elem.style.backgroundColor=cellInfo.backgroundColor;
            elem.style.textDecoration=cellInfo.underline;
            elem.style.textAlign=cellInfo.halign;
            elem.style.textDecoration=cellInfo.underline;
            elem.style.fontFamily=cellInfo.fontFamily;
        }
    }
}

// bold:"normal",
// italic:"normal",
// underline:"none",
// fontsize:"16",
// color:"black",
// backgroundColor:"white",
// halign:"",
// children:[],
// formula:"",
// value:""
//fontFamily:"monoscope"


//adding cell info to addressInput.
//and making  bold italic underline as they were.
//change in ui
let allCells=document.querySelectorAll(".grid .cell");
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(){
        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        rid=Number(rid);
        cid=Number(cid);
        let address=`${String.fromCharCode(65+cid)}${rid+1}`;
        addressInput.value=address;
        console.log(rid,cid,)
        let cellObject=sheetDB[rid][cid];
        if(cellObject.bold=="normal"){
            boldBtn.classList.remove("active-btn");
        }
        else{
            boldBtn.classList.add("active-btn");
        }
        if(cellObject.italic=="normal"){
            italicBtn.classList.remove("active-btn");
        }
        else{
            italicBtn.classList.add("active-btn");
        }
        if(cellObject.underline=="none"){
            underlineBtn.classList.remove("active-btn");
        }
        else{
            underlineBtn.classList.add("active-btn");
        }
        if(cellObject.formula){
            formulaBar.value=cellObject.formula;
        }else{
            formulaBar.value="";
        }
    })
}
//addressInput is box in UI that has selected  cell info
 function findUICellElement(){
     let address=addressInput.value;
     let ridcidObj=getRIDCIDFROMAddress(address);
     let rid=ridcidObj.rid;
     let cid=ridcidObj.cid;
     //selecting the current cell " " are necessary here
     let uiCellElement=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
     return uiCellElement;
 }
 function getRIDCIDFROMAddress(address){
     let cid=Number(address.charCodeAt(0))-65;
     let rid=Number(address.slice(1))-1;    //because we need 0 indexed value and in numbers
     return {"rid":rid,"cid":cid};
 }

boldBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    if(cellObject.bold=="normal"){
        uiCellElement.style.fontWeight="bold";
        boldBtn.classList.add("active-btn");
        cellObject.bold="bold";
    }else{
        boldBtn.classList.remove("active-btn");
        uiCellElement.style.fontWeight='normal';
        cellObject.bold="normal";
    }

})
//sheetArray
//textDecoration-underline //fontWeigth-bold //fontStyle-italic
underlineBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    uiCellElement.style.textDecoration = "underline";
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];

    if(cellObject.underline=="none"){
        underlineBtn.classList.add("active-btn");
        uiCellElement.style.textDecoration="underline";
        cellObject.underline="underline";
    }
    else{
        underlineBtn.classList.remove("active-btn");
        uiCellElement.style.textDecoration="none";
        cellObject.underline="none";
    }
})
italicBtn.addEventListener("click",function(){
    let uiCellElement=findUICellElement();
    uiCellElement.style.fontStyle="italic";
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    if(cellObject.italic=="normal"){
        uiCellElement.style.fontStyle="italic";
        italicBtn.classList.add("active-btn");
        cellObject.italic="italic";
    }
    else{
        italicBtn.classList.remove("active-btn");
        uiCellElement.style.fontStyle="normal";
        cellObject.italic="normal";
    }

})

//default click ist cell addressInput will have A1
allCells[0].click(); 
allCells[0].focus();
grid.addEventListener("keydown",function(event){
    
    let currcell=addressInput.value;
    let currCol=currcell.charCodeAt(0)-65;    // move from one cell to another using key board keys
    let currRow=currcell.substring(1);
    if(event.keyCode==37){
        let newCell=(26*(currRow-1)+currCol-1);
        if(newCell>=0){
            allCells[newCell].focus();
            allCells[newCell].click();
        }
    }
    else if(event.keyCode==39){
        let newCell=(26*(currRow-1)+currCol+1);
        if(newCell<2600){
            allCells[newCell].focus();
            allCells[newCell].click();
        }
    }
    else if(event.keyCode==38){
        let newCell=(26*(currRow-2)+currCol);
        if(newCell>=0){
            allCells[newCell].focus();
            allCells[newCell].click();
        }
       
    }
    else if(event.keyCode==40){
        let newCell=(26*(currRow)+currCol);
        if(newCell>=0){
            allCells[newCell].focus();
            allCells[newCell].click();
        }
    }
})
///font size
fontSizeElem.addEventListener("change", function () {
    let val = fontSizeElem.value;
    let uiCellElement = findUICellElement();
    uiCellElement.style.fontSize = val + "px";
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    cellObject.fontSize=uiCellElement.style.fontSize;
})


///change font family
fontFamilyElem.addEventListener("change",function(){
    let value=fontFamilyElem.value;
    let uiCellElement=findUICellElement();
    uiCellElement.style.fontFamily =value;
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    cellObject.fontFamily=uiCellElement.style.fontFamily;
});
//change alignment left right center
for (let i = 0; i < alignBtns.length; i++) {
    alignBtns[i].addEventListener("click", function () {
        let alignment = alignBtns[i].getAttribute("class");
        console.log(  alignment)
        let  arr= alignment.split(" ");
        let uiCellElement = findUICellElement();
        uiCellElement.style.textAlign = arr[2];
        let cid=uiCellElement.getAttribute("cid");
        let rid=uiCellElement.getAttribute("rid");
        console.log(rid  , cid);
        let cellObject=sheetDB[rid][cid];
       // console.log(cellObject);
        cellObject.halign=uiCellElement.style.textAlign;
    })
}
//change text color
color.addEventListener("change",function(event){
    let newcolor=color.value;
    let uiCellElement = findUICellElement();
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    cellObject.color=newcolor;
    uiCellElement.style.color=newcolor;
})
BgColor.addEventListener("change",function(event){
    let newcolor=BgColor.value;
    let uiCellElement = findUICellElement();
    let cid=uiCellElement.getAttribute("cid");
    let rid=uiCellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    cellObject.backgroundColor=newcolor;
    uiCellElement.style.backgroundColor=newcolor;
})
// bold:"normal",
// italic:"normal",
// underline:"none",
// fontsize:"16",
// color:"black",
// backgroundColor:"white",
// halign:"",
// children:[],
// formula:"",
// value:""