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
            console.log(err);
        });
    };

    transferMoney({ to, amount }, callback) {
        return ApiConnector.addMoney({ to, amount }, (err, data) => {
            console.log(`Tranfering ${amount} of NETCOINS to ${to}`);
            callback(err, data);
            console.log(err);
        });
    };
};


function ggetStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log('Getting stocks info');
        callback(err, data);
        
    });;
};


function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });

    const Petya = new Profile({
        username: 'petya',
        name: { firstName: 'Piotr', lastName: 'Boitsov' },
        password: 'petyaspass',
    });
    
    //console.log(Ivan.name.lastName);
    //console.log(Ivan.password);
    // сначала создаем и авторизуем пользователя
    let currentRate;
    ggetStocks((err, data) => {
        if (err) {
          console.error(err);
        } else {
            console.log(data);
            currentRate = data[99];
            console.log(currentRate);
  
            Ivan.createUser((err, data) => {
                if (err) {
                    console.error(`Error during creating Ivan`);
                } else {
                    console.log(`User Ivan is created`);
                    console.log(data);
    
                    Ivan.performLogin((err, data) => {
                        if (err) {
                            console.error(`Error during logging in as Ivan`);
                        } else {
                            console.log('Ivan is authorized');
                            console.log(data);

                            let amount1 = 50000;
                            
                            Ivan.addMoney({ currency: 'EUR', amount: amount1 }, (err, data) => {
                                if (err) {
                                    console.error('Error during adding money to Ivan');
                                } else {
                                    //amount1 = amount;
                                    console.log(`Added ${amount1} euros to Ivan`);
                                    console.log(data);
                                    
                                    let targetAmount1 = amount1 * currentRate.EUR_NETCOIN;
                                    console.log(currentRate.EUR_NETCOIN);
                                    console.log(targetAmount1);
                                    let fromCurrency1 = 'EUR';
                                    let targetCurrency1 = 'NETCOIN';
                                    
                                    Ivan.convertMoney({ fromCurrency: fromCurrency1, targetCurrency: targetCurrency1, targetAmount: targetAmount1 }, (err, data) => {
                                        if (err) {
                                            console.error(`Error during converting ${Ivan.username}'s money`);
                                        } else {
                                            console.log(`Converted ${fromCurrency1} to ${targetAmount1} ${targetCurrency1} to Ivan`);
                                            console.log(data);
          
                                            Petya.createUser((err, data) => {
                                                if (err) {
                                                    console.error(`Error during creating Petya`);
                                                } else {
                                                    console.log(`User Petya is created`);
                                                    console.log(data);

                                                    let transferringAmount = 0.1 * targetAmount1;

                                                    Ivan.transferMoney({ to: Petya.username, amount: transferringAmount}, (err, data) => {
                                                        if (err) {
                                                            console.error(`Error during transferring money to Petya`);
                                                        } else {
                                                            console.log(`${transferringAmount} of ${targetCurrency1} transferred`);
                                                            console.log(data);
                                                        }
                                                    }); 
                                                };
                                            });        
                                        };
                                    });
                                };
                            });
                        };
                    });
                };  
            });
        };
    });
};

main();
