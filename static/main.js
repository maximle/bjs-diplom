class Profile {
    constructor(obj) {
        this.username = obj.username,
        this.name = obj.name,
        this.passworrd = obj.password
    }

     createUser({
        username,
        name: { firstName, lastName },
        password,
    }, callback) {
        return ApiConnector.createUser({
            username,
            name: { firstName, lastName },
            password,
        }, (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);
        });
    };

     performLogin({ username, password }, callback) {
        return ApiConnector.performLogin({ username, password }, (err, data) => {
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

function ggetStocks() {
    let stocksArr = ApiConnector.getStocks();
    
    return stocksArr;
};

console.log(ggetStocks());

function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя
    Ivan.createUser({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
        }, (err, data) =>{
        if (err) {
            console.error('Error during creating Ivan');
        } else {
            console.log(`${username} is created`);
        };
    });
    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 500000 euros to Ivan`);
        };
    });
};

main();