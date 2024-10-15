const btn = document.querySelector(".list");

btn.addEventListener("click", (e) => {
    e.stopPropagation();
    let tar = e.target;
    if(tar.tagName !== 'BUTTON') return ;   
    tar = tar.parentNode.parentNode;

    //const newDiv = document.createElement("div");
    const newInput = document.createElement("input");
    newInput.draggable = true;

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

// Biến lưu vị trí ban đầu của ô.
let position = [null, null];

btn.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    
    let tar = e.target;
    if(tar.tagName !== "INPUT") return ;

    // Tạo ra bản sao của tar, ta sẽ thao tác với cái này.
    copy_tar = document.createElement("input");
    copy_tar.innerHTML = tar.innerHTML; 

    copy_tar.ondragstart = function() {
        return false;
    };

    copy_tar.classList.add("dragable");
    // Nếu chưa được gán thì gán.
    if(position[0] === null) {
        position = [tar.style.left, tar.style.top];
    }

    // Ô di chuyển theo con trỏ chuột, chuột nằm chính giữa ô.
    function moveAt(pageX, pageY) {
        copy_tar.style.left = pageX - tar.style.width/2 + "px";
        copy_tar.style.top = pageY - tar.style.height/2 + "px";
    }

    moveAt(e.pageX, e.pageY);
    copy_tar.style.backgroundColor = "red";
    // Gán con vị trí với con trỏ chuột.
    function onMouseMove(e) {
        copy_tar.ondragstart = function() {
            return false;
        };
        moveAt(e.pageX, e.pageY);
        
        let tar = e.target;

    }
    
    document.addEventListener("mousemove", onMouseMove);

    // Cột có con trỏ chuột nằm trong sẽ là cột được thêm.
    function onMouseUp(event) {
        event.stopPropagation();
        document.removeEventListener("mousemove", onMouseMove);
        const lst = document.querySelectorAll("#listitem");

        let x = event.pageX, y = event.pageY;

        lst.forEach((item) => {
            let lmao = item.getBoundingClientRect();
            [lefti, righti, topi, bottomi] = [lmao.left, lmao.right, lmao.top, lmao.bottom];
            
            if(!(lefti <= x && x <= righti && topi <= y && y <= bottomi)) return ;

            let newNode = document.createElement("INPUT");
            item.appendChild(newNode);
            newNode.innerHTML = copy_tar.innerHTML;
        });

        
        // let node = event.target;
        // if(node.tagName === "INPUT") node = node.parentNode;
        // if(node.tagName === "BUTTON") node = node.parentNode.parentNode;
        // if(node.tagName !== "DIV") return ;
    }

    // thêm mouseup để xoá mousemove
    document.addEventListener("mouseup", onMouseUp);
    // Xong rùi thì xoá đi
    //document.removeEventListener("mouseup", onMouseUp);

    
    //console.log(`${tar.style.left} ${tar.style.top}\n`);
});

// Tạo ra 1 input copy dính vào con trỏ chuột.
// Thêm mouseup => Xoá mousemove đi. 