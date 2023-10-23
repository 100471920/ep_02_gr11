/*
    Authors:
        Santiago Kiril Cenkov Stoyanov / 100472051@alumnos.uc3m.es
        Oscar Hontoria Herrador / 100471920@alumnos.uc3m.es
*/

var ShopingList = [];
var Total_price = 0;

const productname = document.getElementsByClassName('product-name');
const productprice = document.getElementsByClassName('product-price');
var names =[];
var prices =[];
var quatities=[];

for (let i = 0; i < productname.length; i++) {
    names.push(productname[i].innerText);
};
for (let i = 0; i< productprice.length;i++){
    prices.push(Number(productprice[i].innerText.replace('$','')));
};

function update_quantities(){
    var productquantities = document.getElementsByClassName('Quantity');
    quatities=[];
    for (let i = 0; i< productquantities.length;i++){
        quatities.push(Number(productquantities[i].value));
    }
}

function find_iterarion(nombre){
    for (let i = 0; i < names.length; i++){
        if (names[i] == nombre){
            return i;
        }
    }
};


function add_product(nombre) {
    update_quantities();
    let j = find_iterarion(nombre);

    for (let i = 0; i < ShopingList.length; i++){
        if (ShopingList[i][0] == nombre) {
            ShopingList[i][1] = Math.min(Number(ShopingList[i][1]) + quatities[j],100);/*maximo 100 de cada unidad*/
            nombre = '';
            ShopingList[i][2] = ShopingList[i][2] + Number((Math.min(quatities[j],100-Number(ShopingList[i][1]))*prices[j]).toFixed(2));
            Total_price = Total_price + Number((Math.min(quatities[j],100-Number(ShopingList[i][1]))*prices[j]).toFixed(2));
        }
    }
    if(nombre!=''){
        let price = Number((Math.min(quatities[j],100)*prices[j]).toFixed(2));
        Total_price = Total_price + price;
        ShopingList.push([nombre,Math.min(100,quatities[j]),price])};/*para append  si no esta en la lista*/
    update_cart();
    console.log(ShopingList,"total",Total_price);
      };
    
function remove_product(nombre) {
    update_quantities();
    let j = find_iterarion(nombre);

    for (let i = 0; i < ShopingList.length; i++){
        console.log(ShopingList.length,ShopingList[i][0],nombre,i);
        if (ShopingList.length <=0){return};
        if (ShopingList[i][0] == nombre) {

            console.log("cosasas",ShopingList[i][1],quatities[j]);
            if (quatities[j]>ShopingList[i][1]){
                quatities[j]=Number(ShopingList[i][1]);
            };
            ShopingList[i][1] = Number(ShopingList[i][1]) - quatities[j];
            ShopingList[i][2] = ShopingList[i][2] - Number(Math.min(ShopingList[i][1],quatities[j])*prices[j].toFixed(2));
            Total_price = Total_price - Number(quatities[j]*prices[j].toFixed(2));
        }
        if (ShopingList[i][1]<= 0){
            ShopingList.splice(i,1);
        };
    };
    update_cart();
    console.log(ShopingList,"total",Total_price);

};


function update_cart(){
    createTable(ShopingList,'ShopingList');
    
};

function removeTable(id)
    {
    var div = document.getElementById(id);
    while(div.firstChild)
        div.removeChild(div.firstChild);
    }


function createTable(data,id){
    removeTable(id);
    let list = document.getElementById(id);
    for (i = 0; i < data.length; ++i) {
        let li = document.createElement('li');
        if(id=='ShopingList'){
            li.innerText = data[i][0]+'  x'+data[i][1]};
        if(id=='ReviewList'){
            li.innerText = data[i][0]+'  x'+data[i][1] + ' $'+data[i][2]}
        list.appendChild(li);
    }
    if(id=='ReviewList'){
        let li = document.createElement('li');
        li.innerText ='Total a pagar : $'+ Total_price;
        list.appendChild(li);
    }
}

function showList(){
    if (document.getElementById("ShopingList").style.display=="none"){
        document.getElementById("ShopingList").style.display="flex"
        //document.getElementById("btn-carro").style.backgroundColor='green';
    }else {document.getElementById("ShopingList").style.display="none";};

}

function avanzar(){
    if (document.getElementById("menu").style.display!="none"){
        document.getElementById("menu").style.display="none"
        document.getElementById("status").style.display="none"
        document.getElementById("pago").style.display="flex"
        createTable(ShopingList,'ReviewList')}
    
    else if (document.getElementById("pago").style.display!="none"){
        document.getElementById("pago").style.display="none"
        document.getElementById("menu").style.display="none"
        document.getElementById("status").style.display="flex"
        startTimer()
        }
}
function volver(){
    if (document.getElementById("pago").style.display!="none" ){
        document.getElementById("menu").style.display="flex"
        document.getElementById("pago").style.display="none"
        document.getElementById("status").style.display="none"
    }
    /*if (document.getElementById("status").style.display!="none" ){
        document.getElementById("menu").style.display="none"
        document.getElementById("pago").style.display="flex"
        document.getElementById("status").style.display="none"
    }*/

}
function startTimer(){
    // Set the date we're counting down to
    var countDownDate = new Date().getTime() +10*1000;

    // Update the count down every 1 second
    var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
        
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
    document.getElementById("clock").innerHTML = minutes + "m " + seconds + "s ";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x); 
        document.getElementById("clock").innerHTML = "EXPIRED";
        endTimer();
        
    }
    }, 1000);
}

function endTimer(){
 document.getElementsByClassName("adios").innerHTML="entregado, que tenga un buen dia, you will be redirected"
 var timer = setTimeout(function() {
    window.location.href = '../structure/index.html'
}, 3000);

}