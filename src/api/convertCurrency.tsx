type formType = FormDataEntryValue | null;

export const convertCurrency = async(from : formType, to : formType, amount: formType) => {

     try {
          const response = await fetch(`${import.meta.env.VITE_PROXY_BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}`)
          const data = await response.json()
          return data
     } catch(error) {
          console.log(error)
     }
}