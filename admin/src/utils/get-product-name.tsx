export const getProductName=(product:any)=>{
    if(product.product_type==="simple"){
        return product.name;}
        else {
            return product.name+" - "+product.variation_options.find((v:any)=>v.id===product.pivot.variation_option_id).title;
        }

   
}