export const parseTransactionString = (str: String) => {
    let arr = str.split(',')
    return {
        hash: arr[0],
        date: new Date(arr[1].trim()),
        amount: Number(arr[2])
    }

}

export const isFraudulentCard = (db: any, newTransaction: any, threshold: any) => {
    return db.get(newTransaction.hash)
        .filter((t: { date: any }) => isWithin24h(t?.date, newTransaction.date))
        .reduce((acc: any, trans: { amount: any }) => { return acc + trans.amount }, 0) > threshold
}

export const isWithin24h = (then: { getTime: () => number }, now: { getTime: () => number }) => {
    const msBetweenDates = Math.abs(then.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    return hoursBetweenDates < 24
}

export const dsa = (then: { getTime: () => number }, now: { getTime: () => number }) => {
    const msBetweenDates = Math.abs(then.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    return hoursBetweenDates < 24
}