let ok = [0];

class Profile {
    constructor(obj) {
        this.username = obj.username,
        this.name = obj.name,
        this.passworrd = obj.password
    }
    
     createUser(callback) {
        return ApiConnector.createUser({
            username: this.username,
            name: this.name,
            password: this.password,
        }, (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);   
            console.log(err);  
        });
        
    };
    
     performLogin(callback) {
        return ApiConnector.performLogin({ 
            username: this.username,
            password: this.password,
        }, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err, data);
            
        });
        
    };

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    };

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    };

    transferMoney({ to, amount }, callback) {
        return ApiConnector.addMoney({ to, amount }, (err, data) => {
            console.log(`Tranfering ${amount} to ${to}`);
            callback(err, data);
        });
    };
};

window.currentRate = 0;
function ggetStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log('Getting stocks info');
        callback(err, data);
        
    });;
};

let stocksArr = ggetStocks((err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      //console.log(data[99]);
      window.currentRate = data[99];
      console.log(window.currentRate);
    };
    return window.currentRate;
});
console.log(stocksArr);
console.log(window.currentRate);

//console.log(stocksArr.length);

function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });
    
    //console.log(Ivan.name.lastName);
    //console.log(Ivan.password);
    // сначала создаем и авторизуем пользователя
    

    function createUser1(){ 
        return Ivan.createUser((err, data) => {
        
        if (err) {
            console.error(`Error during creating Ivan`);
            
        } else {
            
            console.log(`User Ivan is created`);
            console.log(data);
        };
        
    });
    };

    createUser1();
    
    function performLogin1(){
       return Ivan.performLogin((err, data) => {
                if (err) {
                    console.error(`Error during logging in as Ivan`);
                } else {
                    console.log('Ivan is authorized');
                    console.log(data);
                };
        });
    };

    setTimeout(performLogin1, 2000);
    
    function addMoney1() {
        return Ivan.addMoney({ currency: 'EUR', amount: 50000 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 500000 euros to Ivan`);
                console.log(data);
        };
    });
    }

    setTimeout(addMoney1, 4000);
    //let targetAmount = stocksArr[stocksArr.length - 1];
    //console.log(stocksArr.length);
    //function 
        
    
    
    //после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    
    
};

main();

//console.log(ok[0]);