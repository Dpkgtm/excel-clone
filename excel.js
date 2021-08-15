// let add_btn=document.querySelector(".add-sheet_btn-container");
// let sheetList=document.querySelector(".sheet-list");
// let firstSheet=document.querySelector(".sheet");

// //to change the active 
// //status we need first sheet also so that first sheet can  be made active
// firstSheet.addEventListener("click",makeMeActive);
// //add_btn to add new sheet 
// add_btn.addEventListener("click",function(){
//     let allSheets=document.querySelectorAll(".sheet");
//     let lastSheet=allSheets[allSheets.length-1];//to get the last index
//     // to update the new sheet new 
//     let lastIdx=lastSheet.getAttribute("idx");
//     lastIdx=Number(lastIdx);//change string to number
//     let newSheet=document.createElement("div");
//     newSheet.setAttribute("class","sheet");
//     newSheet.setAttribute("idx",`${lastIdx + 1}`);//Setting the idx attr of new sheet
//     newSheet.innerText=`sheet ${lastIdx + 2}`;
//     sheetList.appendChild(newSheet);
//     //now changing the active status to current sheet
//     for(let i=0;i<allSheets.length;i++){
//         allSheets[i].classList.remove("active");
//     }
//     newSheet.classList.add("active");
//     //create new sheet grid
//     createSheet();

//     //  3d array -> sheetDB
//     // current db sheet change
//     sheetDB=sheetArray[lastIdx+1];
//     newSheet.addEventListener("click",makeMeActive);
// })
// //any  sheet which has active status will be inactive
// // and clicked sheet will be active
// function makeMeActive(e){
//     let sheet=e.currentTarget;
//     let allSheets=document.querySelectorAll(".sheet");
//     for(let i=0;i<allSheets.length;i++){
//         allSheets[i].classList.remove("active");
//     }
//     sheet.classList.add("active");
//     let idx=sheet.getAttribute("idx");
//     if(sheetArray[idx]){
//         createSheet();
//     }
//     sheetDB=sheetArray[idx];
//     setUI();
// }
// //to show active we make the sheets background white
// //one sheet can be active at a time so make all other sheets inactive(remove active class)
// //if new sheet is added make that sheet active
// // and first sheet is active by default
// //so eventListener is added to first sheet also***

// make new sheet 
