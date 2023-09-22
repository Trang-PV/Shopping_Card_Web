var cart = [];
var quantity = [];

function getEle(id) {
    return document.getElementById(id);
}

function getListProduct() {
    axios({
        url: "https://62bc4e966b1401736cf774ef.mockapi.io/api/products",
        method: "GET",
    })
        .then(function (result) {
            renderProducts(result.data);
            renderProductsCart();
        })

        .catch(function (err) {
            console.log(err);
        });
}

getListProduct();
renderProductsCart();

function renderProducts(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var Json = JSON.stringify(data[i]).replace(/\"/g, "'");
        content += `
        <div class="card col-3 ps-5 pe-5">
        <div class="top-title">
            <i class="fab fa-apple"></i>
            <i class="product-header__icon-samsung fa-brands fa-galactic-republic"></i>
            <em class="stock">VIETNAMESE</em>
        </div>
        <div class="img-container">
            <img class="product-img" src="${data[i].img}" alt="">
        </div>
        <div class="details">
            <div class="name-fav">
                <strong style="font-size: 16px; color:#fff;" class="product-name">${data[i].name}</strong>
            </div>
            <div class="wrapper">
                <h5>${data[i].desc}</h5>
                <p>Màn hình : ${data[i].screen}</p>
                <p>Back Camera: ${data[i].backCamera}</p>
                <p>Front Camera : ${data[i].frontCamera}</p>
            </div>
            <div class="purchase">
                <p class="product-price">$ ${data[i].price}</p>
                <span class="btn-add">
                    <button class="add-btn" onclick="addProductToCart(${Json})">
                        Add
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </span>
            </div>
        </div>
    </div>
        `;
    }
    getEle("cart").innerHTML = content;
}

function addProductToCart(data) {
    var i = cart.findIndex(item => item.id === data.id);
    if (i === -1) {
        cart.push({ ...data, quantity: 1 });
    } else {
        cart[i].quantity = ++cart[i].quantity;
    }
    LocalStorage();
    renderProductsCart();
}

function takeLocalStorage() {
    if (localStorage.getItem("TaskProduct") !== null) 
    cart = JSON.parse(localStorage.getItem("TaskProduct"));
}

function LocalStorage() {
    localStorage.setItem("TaskProduct", JSON.stringify(cart));
}



function sumMoneyCart(){
    // var listTotalMoney = [];
    var sum =0;
    // for(var i=0;i<cart.length;i++){
// sum = +((+cart[i].quantity)*(+cart[i].price));
// sum += cart[i].price*cart[i].quantity;
// listTotalMoney.push(sum);
    // }

    for(var i=0;i<cart.length;i++){
    //     // sum = +((+cart[i].quantity)*(+cart[i].price));
        sum += cart[i].price*cart[i].quantity;
    //     listTotalMoney.push(cart[i].price*cart[i].quantity);
            }

        }
   
    

 


function renderProductsCart() {
    takeLocalStorage();
    var result = "";
    for (var i = 0; i < cart.length; i++) {
        result += `
        <div class="cart-item">
            <div class="cart-img" >
                <img style="border-radius: 8px;" src="${cart[i].img}" alt="">
            </div>
            <strong class="name" style="color: yellow;font-size: 35px;">${cart[i].name}</strong>
            <span class="qty-change">
                <div style="display: flex;">
                    <button class="btn-qty" onclick="decreaseProduct('${cart[i].id}')"><i class="fas fa-chevron-left"></i></button>
                    <p class="qty" style="color: black;font-size: 20px;">${cart[i].quantity}</p>
                    <button class="btn-qty" onclick="incrementProduct('${cart[i].id}')"><i class="fas fa-chevron-right"></i></button>
                </div>
            </span>
            <p class="price" style="color: black;font-size: 20px;font-weight: 500;">$ ${cart[i].price*cart[i].quantity}</p>
            <button onclick="deleteProduct(${i})"><i style="font-size: 25px;" class="fas fa-trash"></i></button>
        </div>

        `
    }

    getEle("cart-container").innerHTML = result;
    if (cart.length != 0) {
        getEle("emty-cart").style.display = "none";

    } else {
        getEle("emty-cart").style.display = "block";
    }

// if(deleteProduct() =click()){
//     document.querySelector(".total").innerHTML = 0;
// }


    

    getEle("total-qty").innerHTML = cart.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.quantity;
    }, 0);
    // document.querySelector(".total").innerHTML =cart.reduce((accumulator, currentValue) => {
    //     return accumulator += +currentValue.price;
    // }, 0);

    var sum =0;
    for(var i=0;i<cart.length;i++){
            sum += cart[i].price*cart[i].quantity;
            document.querySelector(".total").innerHTML = sum;
            if(cart.quantity === 0){
                document.querySelector(".total").innerHTML =0;
            }
                }
    
            
    
    // document.querySelector(".total").innerHTML = sum;
    // localStorage();

}

function incrementProduct(id) {
    var index = cart.findIndex(item => item.id === id)
    if (index !== -1) {
        cart[index].quantity = cart[index].quantity += 1
        LocalStorage()
        renderProductsCart()
    }
}

function decreaseProduct(id) {
    var index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity = cart[index].quantity -= 1
            LocalStorage()
            renderProductsCart()
        } else {
            cart.splice(index, 1)
            LocalStorage()
            renderProductsCart()
        }

    }
}

function deleteProduct(i) {
   cart.splice(i, 1);
    LocalStorage();
    renderProductsCart();
}

function purchase(){
    if(cart.length>0){
    cart = [];
    getEle("X").click();
    alert("SUCCESSFUL PURCHASE")
    LocalStorage();
    renderProductsCart();
    document.querySelector(".total").innerHTML =0;
    }
    else{
    alert("Vui lòng thêm sản phẩm vô giỏ hàng !")
    getEle("X").click();
    }
}

function clearCart(){
    if(cart.length>0){
    cart = [];
    alert("SUCCESSFUL CLEAR CART")
    LocalStorage();
    renderProductsCart();
    document.querySelector(".total").innerHTML =0;
    }
    else{
    alert("Hiện tại giỏ hàng đang trống !")
}
}


// con trỏ hiệu ứng
const cursor = document.querySelector('.cursor');
const effect = document.querySelector('.effect');

  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

effect.addEventListener('mouseover', (e) => {
    cursor.classList.add('ripple');
});

effect.addEventListener('mouseleave', () => {
    cursor.classList.remove('ripple');
});




