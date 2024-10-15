const btn = document.querySelector(".list");

btn.addEventListener("click", (e) => {
    e.stopPropagation();
    let tar = e.target;
    if(tar.tagName !== 'BUTTON') return ;   
    tar = tar.parentNode.parentNode;

    //const newDiv = document.createElement("div");
    const newInput = document.createElement("input");
    //tar.appendChild(newDiv);
    tar.appendChild(newInput);
    //newDiv.id = "task";
});

btn.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    let tar = e.target;
    if(tar.tagName !== "INPUT") return ;

    //tar = tar.parentNode;
    tar.style.backgroundColor = "pink";
});

btn.addEventListener("mouseout", (e) => {
    e.stopPropagation();
    let tar = e.target;
    if(tar.tagName !== "INPUT") return ;

    //tar = tar.parentNode;
    tar.style.backgroundColor = "white";
});

// Vật phẩm bị kéo.
let dragItem = null;
// Copy vật phẩm
let copyItem = null;

btn.ondragstart = function() {
    return false;
};

function moveAt(pageX, pageY) {
    copyItem.style.left = pageX - copyItem.offsetWidth/2 + "px";
    copyItem.style.top  = pageY - copyItem.offsetHeight/2 + "px";
    //console.log(`${copyItem.style.left} ${copyItem.style.top}\n`);
}

function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
    //console.log(`${copyItem} ${copyItem.style.height} {e.pageX} {e.pageY}\n`);
}

// function onMouseOver(e) {
//     e.stopPropagation();
//     let tar = document.querySelectorAll("#listitem");
//     // console.log(`${tar.tagName} ${e.pageX} ${e.pageY}`);
    
//     tar.forEach((item) => {
//         const react = item.getBoundingClientRect();
//         const inside = (react.left <= e.clientX && e.clientX <= react.right)
//                         && (react.top <= e.clientY && e.clientY <= react.bottom);
//         if(inside) {
//             item.style.backgroundColor = "grey";
//         }
//         else {
//             item.style.backgroundColor = "white";
//         }
//     });
// }

btn.addEventListener("mousedown", (event) => {
    event.stopPropagation();

    // Kiểm tra có nhấn đúng ô không, nếu đúng thì đổi màu khác cho dễ nhìn :>
    let tar = event.target;
    if(tar.tagName !== "INPUT") return ;
    dragItem = tar;
    //console.log(`${tar.offsetHeight} ${tar.offsetWidth}`);
    //tar.style.backgroundColor = "green";

    // Tạo một bản sao của ô đó, di chuyển theo con chuột.
    copyItem = document.createElement("div");
    copyItem.classList.add("dragable");
    copyItem.style.backgroundColor = "pink";
    copyItem.style.height = tar.offsetHeight;
    copyItem.style.width = tar.offsetWidth;
    copyItem.style.border = "1px solid red";
    copyItem.style.position = "absolute";
    copyItem.innerHTML = tar.value;
    document.body.appendChild(copyItem);
    moveAt(event.pageX, event.pageY);

    //document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mousemove", onMouseMove);
});

document.addEventListener("mouseup", (event) => {
    event.stopPropagation();
    if(copyItem === null) return ;
    //console.log(copyItem);
    document.removeEventListener("mousemove", onMouseMove);
    document.body.querySelector(".dragable").remove();

    let tar = document.querySelectorAll("#listitem");
    // console.log(`${tar.tagName} ${e.pageX} ${e.pageY}`);

    let ok = 0;    

    tar.forEach((item) => {
        const react = item.getBoundingClientRect();
        const inside1 = (react.left <= event.pageX && event.pageX <= react.right)
                    && (react.top <= event.pageY && event.pageY <= react.bottom);
        const inside2 = (react.left <= copyItem.style.left && copyItem.style.left <= react.right)
                    && (react.top <= copyItem.style.top && copyItem.style.top <= react.bottom);

        if(inside1 && !inside2) {
            const newInput = document.createElement("input");
            newInput.value = copyItem.innerHTML;
            //tar.appendChild(newDiv);
            item.appendChild(newInput);
            ok = 1;
        }
    });
    copyItem = null;
});

// Tạo ra 1 input copy dính vào con trỏ chuột.
// Thêm mouseup => Xoá mousemove đi. 