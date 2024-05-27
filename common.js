let allLikeButton = document.querySelectorAll('.like-btn');

async function likeButton(productId, btn){
    try{
        // console.log('liked the product');
    let response = await axios({
        method: 'post',
        url: `/products/${productId}/like`,
        headers:{'X-Requested-With' : 'XMLHttpRequest'}
    })
        if(btn.children[0].classList.contains('fa-regular')){
            console.log("Be-rang");
            btn.children[0].classList.remove('fa-regular');
            btn.children[0].classList.add('fa-solid');
        }
        else{
            console.log("Rang Barse Bhighe chunar wali");
            btn.children[0].classList.add('fa-solid');
            btn.children[0].classList.remove('fa-regular');   
        }
    }
    
    catch(e){
        window.location.replace('/login');
        console.log(e.messgae, 'error hai yeh window wali line ka');
    }

}

for(let btn of allLikeButton){
    btn.addEventListener('click',()=>{
        let productId = btn.getAttribute('product-id');
        likeButton(productId, btn);
    })
 }