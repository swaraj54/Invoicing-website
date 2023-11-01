import React, { useState } from 'react';
import './App.css'

const App = () => {

  const [invoices, setInvoices] = useState([]);

  const [formData, setFormData] = useState({
    qty: '',
    costPrice: '',
    marginPercentage: '',
    discountPercentage: '',
    taxPercentage: '',
  })

  const handleInputChange = (e, index, field) => {

    const { value } = e.target

    const updatedInvoices = [...invoices]

    updatedInvoices[index] = {
      ...updatedInvoices[index],
      [field]: value !== '' ? parseInt(value) : '',
    }

    updatedInvoices.forEach((invoice) => {
      const { qty, costPrice, marginPercentage, discountPercentage, taxPercentage } = invoice
      const margin = qty * (costPrice * (marginPercentage / 100))
      const salesPrice = costPrice + margin
      const totalSalesPrice = qty * salesPrice
      const discount = totalSalesPrice * (discountPercentage / 100)
      const tax = totalSalesPrice * (taxPercentage / 100)
      const finalSalesPrice = totalSalesPrice - discount + tax
      invoice.margin = isNaN(margin) ? '' : margin
      invoice.salesPrice = isNaN(salesPrice) ? '' : salesPrice
      invoice.totalSalesPrice = isNaN(totalSalesPrice) ? '' : totalSalesPrice
      invoice.discount = isNaN(discount) ? '' : discount
      invoice.tax = isNaN(tax) ? '' : tax
      invoice.finalSalesPrice = isNaN(finalSalesPrice) ? '' : finalSalesPrice
    })

    setInvoices(updatedInvoices)


  }

  const handleAddInvoice = () => {

    const { qty, costPrice, marginPercentage, discountPercentage, taxPercentage } = formData

    const margin = parseInt(qty) * (parseInt(costPrice) * (parseInt(marginPercentage) / 100))
    const salesPrice = parseInt(costPrice) + margin
    const totalSalesPrice = parseInt(qty) * salesPrice
    const discount = totalSalesPrice * (parseInt(discountPercentage) / 100)
    const tax = totalSalesPrice * (parseInt(taxPercentage) / 100)
    const finalSalesPrice = totalSalesPrice - discount + tax
    const newInvoice = {
      qty: parseInt(qty) || '',
      costPrice: parseInt(costPrice) || '',
      marginPercentage: parseInt(marginPercentage) || '',
      discountPercentage: parseInt(discountPercentage) || '',
      taxPercentage: parseInt(taxPercentage) || '',
      margin: isNaN(margin) ? '' : margin,
      salesPrice: isNaN(salesPrice) ? '' : salesPrice,
      totalSalesPrice: isNaN(totalSalesPrice) ? '' : totalSalesPrice,
      discount: isNaN(discount) ? '' : discount,
      tax: isNaN(tax) ? '' : tax,
      finalSalesPrice: isNaN(finalSalesPrice) ? '' : finalSalesPrice,
    }
    setInvoices([...invoices, newInvoice])
    setFormData({
      qty: '',
      costPrice: '',
      marginPercentage: '',
      discountPercentage: '',
      taxPercentage: '',
    })

  }


  return (
    <div id='parent'>
      <div id='form-section'>
        <h1>Invoice Calculator</h1>
        <label>Quantity</label><br />
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
        /><br />
        <label>Cost Price</label><br />
        <input
          type="number"
          name="costPrice"
          value={formData.costPrice}
          onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
        /><br />
        <label>Margin %</label><br />
        <input
          type="number"
          name="marginPercentage"
          value={formData.marginPercentage}
          onChange={(e) => setFormData({ ...formData, marginPercentage: e.target.value })}
        /><br />
        <label>Discount %</label><br />
        <input
          type="number"
          name="discountPercentage"
          value={formData.discountPercentage}
          onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
        /><br />
        <label>Tax %</label><br />
        <input
          type="number"
          name="taxPercentage"
          value={formData.taxPercentage}
          onChange={(e) => setFormData({ ...formData, taxPercentage: e.target.value })}
        /><br />
        <button onClick={handleAddInvoice}>Submit</button>
      </div>

      {invoices.length &&
        <div id='table-section'>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Cost Price</th>
                <th>Margin %</th>
                <th>Margin</th>
                <th>Sales Price</th>
                <th>Total Sales Price</th>
                <th>Discount %</th>
                <th>Discount</th>
                <th>Tax %</th>
                <th>Tax</th>
                <th>Final Sales Price</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="number"
                      value={invoice.qty}
                      onChange={(e) => handleInputChange(e, index, 'qty')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={invoice.costPrice}
                      onChange={(e) => handleInputChange(e, index, 'costPrice')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={invoice.marginPercentage}
                      onChange={(e) => handleInputChange(e, index, 'marginPercentage')}
                    />
                  </td>
                  <td>{invoice.margin}</td>
                  <td>{invoice.salesPrice}</td>
                  <td>{invoice.totalSalesPrice}</td>
                  <td>
                    <input
                      type="number"
                      value={invoice.discountPercentage}
                      onChange={(e) => handleInputChange(e, index, 'discountPercentage')}
                    />
                  </td>
                  <td>{invoice.discount}</td>
                  <td>
                    <input
                      type="number"
                      value={invoice.taxPercentage}
                      onChange={(e) => handleInputChange(e, index, 'taxPercentage')}
                    />
                  </td>
                  <td>{invoice.tax}</td>
                  <td>{invoice.finalSalesPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default App
