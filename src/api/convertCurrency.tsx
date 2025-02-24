type formType = FormDataEntryValue | null;

export const convertCurrency = async(from : formType, to : formType, amount: formType) => {
   try {
        const response = await fetch(`http://localhost:3000/api/convert?from=${from}&to=${to}&amount=${amount}`)
        const data = response.json()
        return data
   } catch(error) {
        console.log(error)
   }
}