const notesContainer = document.querySelector(".note-container")
const creatBtn = document.querySelector(".btn")
let notes = document.querySelectorAll(".input-box-tittle, .input-box-text");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes")
}
showNotes()

function updateStorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}

creatBtn.addEventListener("click", ()=>{
    let inputBoxTittle = document.createElement("p");
    inputBoxTittle.className = "input-box-tittle";
    inputBoxTittle.setAttribute("contenteditable", "true");
    inputBoxTittle.textContent = "Tittle"
    notesContainer.appendChild(inputBoxTittle);

    let inputBoxText = document.createElement("p");
    let imgText = document.createElement("img");
    inputBoxText.className = "input-box-text";
    inputBoxText.setAttribute("contenteditable", "true");
    inputBoxText.textContent = "Enter note text"
    imgText.src = "img/delete.png"
    notesContainer.appendChild(inputBoxText).appendChild(imgText);

    let timeText = document.createElement("span");
    timeText.className = "input-box-time"
    const now = new Date();
    const timeString = now.toLocaleString();
    timeText.textContent = timeString;
    notesContainer.appendChild(timeText)
})

notesContainer.addEventListener("click",function(e){
    if (e.target.tagName === "IMG") {
        // 클릭된 이미지의 부모 요소를 찾아서 제거합니다.
        const parent = e.target.parentElement;
        
        // inputBoxTitle과 inputBoxText를 찾아서 제거합니다.
        const inputBoxTitle = parent.previousElementSibling;
        const inputBoxText = parent.nextSibling;

        if (inputBoxTitle) {
            inputBoxTitle.remove();
        }
        if (inputBoxText) {
            inputBoxText.remove();
        }

        // 이미지를 포함한 부모 요소 제거
        parent.remove();
        updateStorage()
    } else if(e.target.tagName === "P"){
        notes = document.querySelectorAll("input-box-title, .input-box-text")
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
});