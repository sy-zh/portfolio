const all = document.querySelectorAll(".ux, .product, .coding ");  
const ux = document.querySelectorAll(".ux");  
const product = document.querySelectorAll(".product");  
const coding = document.querySelectorAll(".coding");  
const uxButton = document.querySelector("#ux");
const productButton = document.querySelector("#product");
const codingButton = document.querySelector("#coding");
const allButton = document.querySelector("#all");

function allShow(){
    for(i=0;i<all.length;i++){
        all[i].style.overflow = "visible";
        all[i].style.height = "";
    }
}

allButton.addEventListener("click", allShow); 

function uxShow(){
    for(i=0;i<all.length;i++){
        all[i].style.overflow = "visible";
        all[i].style.height = "";
    }
    for(i=0;i<product.length;i++){
        product[i].style.overflow = "hidden";
        product[i].style.height = 0;
    }
    for(i=0;i<coding.length;i++){
        coding[i].style.overflow = "hidden";
        coding[i].style.height = 0;
    }
}

uxButton.addEventListener("click", uxShow); 

function productShow(){
    for(i=0;i<all.length;i++){
        all[i].style.overflow = "visible";
        all[i].style.height = "";
    }
    for(i=0;i<ux.length;i++){
        ux[i].style.overflow = "hidden";
        ux[i].style.height = 0;
    }
    for(i=0;i<coding.length;i++){
        coding[i].style.overflow = "hidden";
        coding[i].style.height = 0;
    }
}

productButton.addEventListener("click", productShow); 

function codingShow(){
    for(i=0;i<all.length;i++){
        all[i].style.overflow = "visible";
        all[i].style.height = "";
    }
    for(i=0;i<product.length;i++){
        product[i].style.overflow = "hidden";
        product[i].style.height = 0;
    }
    for(i=0;i<ux.length;i++){
        ux[i].style.overflow = "hidden";
        ux[i].style.height = 0;
    }
}

codingButton.addEventListener("click", codingShow); 