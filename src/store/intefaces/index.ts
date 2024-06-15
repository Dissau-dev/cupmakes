
export interface PostRegister {
  email: string,
      first_name: string,
      last_name: string,
    //  username: string,
      password: string,
}
export interface PostOrderDeliveryArgs {
 
    payment_method: string,
    payment_method_title: string,
    set_paid: boolean,
    billing: {
      first_name: string
      last_name: string,
      address_1: string,
      city: string,
      state: string,
      postcode: string,
      country: string,
      email: string,
      phone: string,
    },
    shipping: {
      first_name: string,
      last_name: string,
      address_1: string,
      city: string,
      state: string,
      postcode: string,
      country: string,
    },
    line_items: [
      {
        product_id: string
        quantity: string
      },
    ],
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: 10,
      },
    ],
}
