


export interface User {
    id: number,
 
    email: string,
    first_name: string,
    last_name: string,
    role:string
    username: string,
    billing: {
        first_name: string,
      last_name: string,
        company: string,
        address_1: string,
        address_2: string,
        city: string,
        postcode: string,
        country: string,
        state: string,
        email: string,
        phone: string
    },
    shipping: {
        first_name: string,
        last_name: string,
        company: string,
        address_1: string,
        address_2: string,
        city: string,
        postcode: string,
        country: string,
        state: string,
        phone: string
    },
    is_paying_customer: boolean,
    avatar_url: string,
}

export interface Ticket {
  
    _id: string,
    title: string,
    username: string,
    email: string,
    description: string,
    category: string,
    status: "COMPLETED" | "UNCOMPLETED",
    user: {
        _id: string,
        name: string
    }

}
export interface TicketResponse {
  
    total: number,
  items: Ticket[]
}
export interface Products {
  
    id: number
    name: string
    slug:string,
description: string,
    short_description: string,
    stock_status:string,
    price: number,

    "tax_class": "",
    "manage_stock": false,
    "stock_quantity": null,
    "backorders": "no",
    "backorders_allowed": false,
    "backordered": false,
    "low_stock_amount": null,
    "sold_individually": false,
    "weight": "",
    "dimensions": {
        "length": "",
        "width": "",
        "height": ""
    },
    "shipping_required": true,
    "shipping_taxable": true,
    "shipping_class": "",
    "shipping_class_id": 0,
    "reviews_allowed": true,
    "average_rating": number,
    "rating_count": 0,
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 0,
    "purchase_note": "",
    "categories": [
        {
            "id": 15,
            "name": "Uncategorized",
            "slug": "uncategorized"
        }
    ],
    "tags": [],
    images: any,
 
  

  
}
export interface ProductResponse {
totalPages: number,
currentPage: number,
totalProducts: number, 
data: Products[]
}

export interface AuthToken {
  token: string;
  currentUser: User
}

export interface PublicConfigs {
  key:
    | "is_maintenance_management"
    | "management_min_version_ios"
    | "management_min_version_android"
    | "management_url_google_play"
    | "management_url_app_store";
  value: string;
}




export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  blurHash: string;
}

