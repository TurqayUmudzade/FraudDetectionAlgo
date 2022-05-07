import Transaction from "./interfaces/transaction"

/**
 * Parses a given string to an object
 * @param {str}  - a comma-separated string of hashed credit card number, date,amount
 *  10d7ce2f43e35fa57d1bbf8b1e2, 2014-04-29T13:15:54, 10.00
 */
const parseTransactionString = (str: string): Transaction => {
    let arr = str.split(",")
    return {
        hash: arr[0],
        date: new Date(arr[1].trim()),
        amount: Number(arr[2]),
    }
}

//Sums the amount of a creditcards new transaction within 24 hours and returns a Boolean determining if the card is fraudulent
const isFraudulentCard = (database: Map<string, any>, newTransaction: Transaction, threshold: number): Boolean => {
    return database.get(newTransaction?.hash)
        .filter((trans: Transaction) => isWithin24h(trans?.date, newTransaction.date))
        .reduce((acc: number, trans: Transaction) => { return acc + trans.amount }, 0) > threshold
}

const isWithin24h = (then: Date, now: Date): Boolean => {
    const msBetweenDates = Math.abs(then.getTime() - now.getTime())
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)
    return hoursBetweenDates < 24
}

/**
 * Accepts a list of string transactions and a limit and return a set of hashed credit cards that are fraudulent
 * @param {listOfTransactions}  - a list of a comma-separated string of hashed credit card number, date,amount
 * @param {threshold}  - a number that cannot be exceeded
 */
export const checkTransactions = (
    listOfTransactions: string[],
    threshold: number
) => {
    const database = new Map<string, any>()
    const set = new Set<string>()

    for (const str of listOfTransactions) {
        const { hash, date, amount } = parseTransactionString(str)
        if (set.has(hash)) continue //Already a fraudulent card, no need to check

        const newTransaction = { hash, date, amount }

        //Add the information to a Map using the hash as a unique identifier
        if (!database.has(hash)) {
            database.set(hash, [newTransaction])
        } else {
            const newInsertion = [...database.get(hash), newTransaction]
            database.set(hash, newInsertion)
        }

        // Add card number to set if it fails the test
        if (isFraudulentCard(database, newTransaction, threshold)) {
            set.add(newTransaction.hash)
        }
    }
    return set
}
