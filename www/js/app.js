new Vue({
    el: '#app',
    data: {
        page : 'products',
        cart : {
            items: []
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    },
    
    computed: {
        cartTotal: function() {
            var totalPrice = 0;
            this.cart.items.forEach((item) => {
               totalPrice += item.quantity * item.product.price;
            });

            return totalPrice;
        },
        taxAmount: function() {
            return this.cartTotal * 10 / 100;
        },
        grandTotal: function() {
            return this.cartTotal + this.taxAmount;
        }
    },
    
    methods: {
        addToCart: function(product) {
            var found = false;

            this.cart.items.forEach(item => {
               if (item.product.id == product.id) {
                   item.quantity++;
                   found = true;
               }
            });

            if (!found) {
                this.cart.items.push({
                    product: product, 
                    quantity: 1
                });                
            }

            product.inStock--;
        },
        removeFromCart: function(product) {
            var remove = false;

            this.cart.items.forEach(item => {
               if (item.product.id == product.id) {
                   if (item.quantity == 1) {
                       remove = true;
                   } else {
                       item.quantity--;
                   }

                   product.inStock++;
               }
            });
            if (remove) {
                this.cart.items = this.cart.items.filter(item => {
                    return item.product.id !=product.id;
                });
            }
        },
        checkout: function() {
            if (confirm('Do you want to proceed to the checkout?')) {
                this.cart.items.forEach(item => {
                    item.product.inStock += item.quantity;
                });
                this.cart.items = [];    
            }
        },
        renderPage: function(page) {
            this.page = page;
        }
    },
    
    filters: {
        currency: function(value) {
            var formatter = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 0
            });
            
            return formatter.format(value);
        }
    }
});