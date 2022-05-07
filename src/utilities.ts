const db = new Map()
const set = new Set()
const parseTransactionString = (str: string) => {
    let arr = str.split(',')
    return {
        hash: arr[0],
        date: new Date(arr[1].trim()),
        amount: Number(arr[2])
    }

}

const isFraudulentCard = (newTransaction: any, threshold: any) => {
    return db.get(newTransaction.hash)
        .filter((t: { date: any }) => isWithin24h(t?.date, newTransaction.date))
        .reduce((acc: any, trans: { amount: any }) => { return acc + trans.amount }, 0) > threshold
}

const isWithin24h = (then: { getTime: () => number }, now: { getTime: () => number }) => {
    const msBetweenDates = Math.abs(then.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    return hoursBetweenDates < 24
}

export const checkTransactions = (listOfTransactions: any) => {
    let str = '10d7ce2f43e35fa57d1bbf8b1e2, 2014-04-29T13:15:54, 10.00'
    let arr = [str, str, str, str, str]

    for (const str of arr) {
        const { hash, date, amount } = parseTransactionString(str)
        if (set.has(hash)) continue

        const newTransaction = { hash, date, amount }

        if (!db.has(hash)) {
            db.set(hash, [newTransaction])
        } else {
            if (isFraudulentCard(newTransaction, 50)) {
                console.log('Fraud')
                set.add(newTransaction.hash)
            }
            const newInsertion = [...db.get(hash), newTransaction]
            db.set(hash, newInsertion)
        }
    }
    return set
}

