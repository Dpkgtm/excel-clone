//let allCells = document.querySelectorAll(".grid .cell");
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("blur",function(){
        let data=allCells[i].innerText;
        let address=addressInput.value;
      //  let{rid,cid}=getRIDCIDFROMAddress(address);
        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        let cellObject=sheetDB[rid][cid];
        if(cellObject.value==data){
            return;
        }
        //if  value is manually set in cell then remove formula
        //from formulabar ans  also from DB  
        if(cellObject.formula){
            removeFormula(cellObject,address);
            formulaBar.value=" ";
        }
        //updating the value in db
        cellObject.value=data;
        // changing its childrens value after its value is changed
        updateChildren(cellObject);
    })  
}
//removing formula and children from parent
//find parents from formula
function removeFormula(cellObject,myName){
    // formula -> parent -> children remove yourself
    let formula=cellObject.formula;
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65&&ascii<=90){
            formulaTokens[i]=formulaTokens[i]+formulaTokens[i+1];
            let{rid,cid}=getRIDCIDFROMAddress(formulaTokens[i]);
            let parentObj=sheetDB[rid][cid];
            let idx=parentObj.children.indexOf(myName);
            parentObj.children.splice(idx,1);
        }
    }
    cellObject.formula="";
}
//if set the formula for cell 
formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter"&&formulaBar.value){
        //if already formula exists
        let cFormula=formulaBar.value;
        let address=addressInput.value;
        let{rid ,cid}=getRIDCIDFROMAddress(address);
        let cellObject=sheetDB[rid][cid];
        if(cFormula!=cellObject.formula){
            removeFormula(cellObject,address);
        }
         // jis cell ke liye formula apply kar rhe hai (address bar wala cell)
        //  ui-> value update
        // ,db-> value,formula update 
        let value=evaluateFormula(cFormula);
        setCell(value,cFormula);
        setParentChArray(cFormula,address);
        updateChildren(cellObject);
    }
})
function evaluateFormula(formula){
    let formulaTokens=formula.split("");
    // after splitting  we get arr=[(,A1,+,A2,)]
    console.log(formulaTokens)
    for(let i=0;i<formulaTokens.length;i++){
        //get only A-Z 
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65&&ascii<=90){
            formulaTokens[i]=formulaTokens[i]+formulaTokens[i+1];
            formulaTokens.splice(i+1,1);
            console.log(formulaTokens[i]);
            let{rid,cid}=getRIDCIDFROMAddress(formulaTokens[i]);
            let value=sheetDB[rid][cid].value;
            console.log(value);
            formulaTokens[i]=value;
            //i++;
        }
    }
    //join()=>array to string default separator is ,
    let evaluatedFormula=formulaTokens.join(" ");
    console.log(evaluatedFormula)
    //eval() takes string as param
    return evaluate(evaluatedFormula);
}
function setCell(value,formula){
    let uiCellElem=findUICellElement();
    uiCellElem.innerText=value;
    let {rid,cid}=getRIDCIDFROMAddress(addressInput.value);
    sheetDB[rid][cid].value=value;
    sheetDB[rid][cid].formula=formula;
}
//get parents from formula then add yourSelf as children
// in parents DB
function setParentChArray(formula,chAddress){
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65&&ascii<=90){
            formulaTokens[i]=formulaTokens[i]+formulaTokens[i+1];
            let{rid,cid}=getRIDCIDFROMAddress(formulaTokens[i]);
            let parentObj=sheetDB[rid][cid];
            parentObj.children.push(chAddress);
        }
    }
}
function updateChildren(cellObject){
    //children array
    let children=cellObject.children;
    for(let i=0;i<children.length;i++){
        let chAddress=children[i];
        let{rid,cid}=getRIDCIDFROMAddress(chAddress);
        let childObj=sheetDB[rid][cid];
        // getting formula from children cell
        let chFormula=childObj.formula;
        let newValue=evaluateFormula(chFormula);
        setChildrenCell(newValue,chFormula,rid,cid);
        //updating child's children when its value changing
        updateChildren(childObj);
    }
}
function setChildrenCell(value,formula,rid,cid)
{
    let uiCellElement=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElement.innerText=value;
    sheetDB[rid][cid].value=value;
    sheetDB[rid][cid].formula=formula;
}