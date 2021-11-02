const calculateTotal = (products) => {
    let total = products.reduce((previous, current) => 
        previous + Number(current.product_price * current.product_quantity), 0
    );
    return total;
}
 
export default calculateTotal;