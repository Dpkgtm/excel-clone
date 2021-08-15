let save = document.querySelector(".save");
let  New =document.querySelector(".new");
let openFile = document.querySelector(".openFile");
let fileDropDown=document.querySelector(".file");
// functionality -> download excel representation
let fileClickFlag=false;
fileDropDown.addEventListener("click",function(e){
    document.getElementById("myDropdown").classList.toggle("show");
    if(!fileClickFlag){
      fileDropDown.style.backgroundColor="rgb(4, 58, 4)";
      fileDropDown.style.color="white";
      fileClickFlag=true;
    }else{
      fileDropDown.style.backgroundColor="white";
      fileDropDown.style.color="black";
      fileClickFlag=false;
    }
});
window.onclick = function(event) {
    if (!event.target.matches('.file')) {
      var dropdowns = document.getElementsByClassName("hidden");
      var i;
      //w'll get dropdowns nodelist so we need to add for loop to get values
      // better is to convert the nodelist to array  something like =>array.from(....)
      fileDropDown.style.backgroundColor="white";
      fileDropDown.style.color="black";
      fileClickFlag=false;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
New.addEventListener("click",function(){
    //sheetDB=[];
    createSheet();
  })
save.addEventListener("click", function () {
    //2d arrayy save file 
    const data = JSON.stringify(sheetDB);
    // convert it into blob
// data -> file like object convert
    const blob = new Blob([data], { type: 'application/json' });
    // convert it any type file into url
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    // content in that file
    a.href = url;
    // file download
    a.download = "file.json";
// anchor click 
    a.click();
})
// downloaded file -> open read 
// input type file -> change event file name
openFile.addEventListener("change", function () {
    // files array -> file accept-> multiple files get
    console.log("open") 
    let filesArray = openFile.files;
    let fileObj = filesArray[0];
    // file reader to read the file
    console.log(fileObj);
    let fr = new FileReader();
    // read as text 
    fr.readAsText(fileObj);
    fr.onload=function(){
        console.log(fr.result);
        let sheetArray=fr.result;
        sheetDB=sheetArray[0];
    }
    fr.addEventListener("load", function () {
      let stringData=fr.result;
      let sheetArray=JSON.parse(stringData);
      console.log(sheetArray)
      setUI(sheetArray);
    })
    console.log("After");
     // ui init f
})

// alert(rows);