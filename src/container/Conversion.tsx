import { use, useActionState, useState  } from "react";
import styles from '../styles/Conversion.module.css'
import { getData } from '../api/getData';
import { convertCurrency } from "../api/convertCurrency";

const currencyPromise = getData()

function Conversion() {
    const data = use(currencyPromise); 
    const [selectFrom, setSelectFrom] = useState(data[0]);
    const [selectTo, setSelectTo] = useState(data[1]);
    const [state, actionFunction, isPending] = useActionState(
        getConversion,
        {
            error: false, 
            conversion: 1
        }
    )

    async function getConversion(prevState: unknown, formData: FormData) {
        const from = formData.get("fromCurrency")
        const to = formData.get("toCurrency");

        if(from === to) {
            return {
                conversion: 1,
                error: true,
            }
        }

        let amount = null;
        if(!formData.get("amount")) {
            amount = "1"
        } else {
            amount = parseInt(formData.get("amount") as string).toString();
        }


        try {
            const conversion = await convertCurrency(from, to, amount)
            return {
                error: false,
                conversion: conversion.response,
            }
        } catch(error) {
            console.log(error)
            return {
                error: true,
                conversion: 1
            }
        }
    }

    return (
        <article className={styles.container}>
            <h1>Currency Converter</h1>
            <form action={actionFunction}>
                <div className={styles.formGroup}>
                    <label htmlFor="fromCurrency">From:</label>
                    <select name="fromCurrency"
                        onChange={(e) => setSelectFrom(e.target.value)}
                    >
                            { data.filter(currency => currency !== selectTo). map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="toCurrency">To:</label>
                    <select name="toCurrency"
                            onChange={(e) => setSelectTo(e.target.value)}
                    >
                            { data.filter(currency => currency !== selectFrom). map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        type="number" 
                        name="amount" 
                        id="amount"
                        min={1}
                        defaultValue={1}
                        />
                </div>

                <button type="submit" disabled={isPending} className={styles.submitBtn}>{isPending ? "Converting..." : "Convert"}</button>             
            </form>

            <div className={styles.results}>
                {state.error ? <p className={styles.error}>Error getting Conversion. use different Currencies</p> : <></>}
                <p>Result: <span>{`${state?.conversion.toFixed(2)} ${selectTo}`}  </span></p>
            </div>
        </article>
    )
}

export default Conversion;