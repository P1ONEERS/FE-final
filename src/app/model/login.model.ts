export class Login {
    id: string;
    name: string;
    username: string;
    email: string;
    mpin: string;
    accessToken: string; // Add this property
    balance: number; // Add this property
    accountType: string; // Add this property
    accountNumber: string; // Add this property
    transactionCode: string; // Add this property
    notificationEnabled: boolean; // Add this property

    constructor(
        id: string, 
        name: string, 
        username: string, 
        email: string, 
        mpin: string, 
        accessToken: string, 
        balance: number, 
        accountType: string, 
        accountNumber: string,
        transactionCode: string, 
        notificationEnabled: boolean) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.mpin = mpin;
        this.accessToken = accessToken;
        this.balance = balance;
        this.accountType = accountType;
        this.accountNumber = accountNumber;
        this.transactionCode = transactionCode;
        this.notificationEnabled = notificationEnabled;
    }
}
