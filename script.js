const currencyE1_one = document.getElementById('currency-one');
const currencyE1_two = document.getElementById('currency-two');
const amountE1_one = document.getElementById('amount-one');
const amountE1_two = document.getElementById('amount-two');

const rateE1 = document.getElementById('rate');
const swap=document.getElementById('swap');

//fetch currency rates and update the dom
function calculate() {
    const currency_one = currencyE1_one.value;
    const currency_two = currencyE1_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/4b325669a4eec3cbbc99f7bc/latest/${currency_one}`)
        .then(res => res.json())
        .then((data) => {
            //console.log(data);
            const rate = data.conversion_rates[currency_two];
            rateE1.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
            
            amountE1_two.value = (amountE1_one.value * rate).toFixed(2);
        });

}

currencyE1_one.addEventListener('click', calculate);
currencyE1_two.addEventListener('click', calculate);
amountE1_one.addEventListener('input', calculate);
amountE1_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyE1_one.value;
    currencyE1_one.value = currencyE1_two.value;
    currencyE1_two.value = temp;
    calculate();
})

calculate();