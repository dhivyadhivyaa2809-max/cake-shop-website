let cart=[];
let orders=[];
let selectedPayment="";

function login(){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("cakePage").style.display="block";
}

function addToCart(name,price){
    let item=cart.find(i=>i.name===name);
    if(item){
        item.qty++;
    }else{
        cart.push({name,price,qty:1});
    }
    updateCartCount();
}

function updateCartCount(){
    let count=cart.reduce((s,i)=>s+i.qty,0);
    document.getElementById("cartCount").innerText=count;
}

function showCart(){
    document.getElementById("cakePage").style.display="none";
    document.getElementById("cartPage").style.display="block";

    let html="";
    let total=0;

    cart.forEach((i,index)=>{
        let t=i.price*i.qty;
        total+=t;

        html+=`
        <tr>
            <td>${i.name}</td>
            <td>₹${i.price}</td>
            <td>
                <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
                ${i.qty}
                <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
            </td>
            <td>₹${t}</td>
            <td>
                <button class="remove-btn" onclick="removeItem(${index})">❌</button>
            </td>
        </tr>`;
    });

    document.getElementById("cartItems").innerHTML=html;
    document.getElementById("totalAmount").innerText=total;
}

function changeQty(index,change){
    cart[index].qty+=change;
    if(cart[index].qty<=0){
        cart.splice(index,1);
    }
    updateCartCount();
    showCart();
}

function removeItem(index){
    cart.splice(index,1);
    updateCartCount();
    showCart();
}

function proceedPayment(){
    document.getElementById("cartPage").style.display="none";
    document.getElementById("paymentPage").style.display="block";
}

function selectPayment(method){
    selectedPayment=method;
    document.getElementById("qrSection").style.display =
        method==="upi" ? "block" : "none";
}

function confirmOrder(){
    let address=document.getElementById("address").value;
    let city=document.getElementById("city").value;
    let pincode=document.getElementById("pincode").value;

    if(address===""||city===""||pincode===""){
        alert("Enter delivery address");
        return;
    }

    if(selectedPayment===""){
        alert("Select payment method");
        return;
    }

    orders.push(...cart);
    cart=[];
    updateCartCount();

    document.getElementById("paymentPage").style.display="none";
    document.getElementById("historyPage").style.display="block";

    let paymentText = selectedPayment==="cod"
        ? "Cash on Delivery"
        : "UPI (cakeshop@upi)";

    let html=`<p><b>Payment:</b> ${paymentText}</p>
              <p><b>Address:</b> ${address}, ${city} - ${pincode}</p>
              <hr>`;

    orders.forEach(o=>{
        html+=`<li>${o.name} × ${o.qty}</li>`;
    });

    document.getElementById("orderHistory").innerHTML=html;
}
