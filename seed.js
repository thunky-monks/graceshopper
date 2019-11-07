const db = require('./server/db')
const {Product, User, Cart, ProductCart} = require('./server/db/models')

const users = [
  {
    email: 'kedmundson0@dell.com',
    firstName: 'Kort',
    lastName: 'Edmundson',
    password: 'qTUqnL1wF8',
    address: '36 Oneill Plaza'
  },
  {
    email: 'dendon1@sciencedaily.com',
    firstName: 'Delmor',
    lastName: 'Endon',
    password: 'gD7znt',
    address: '60 Paget Hill'
  },
  {
    email: 'rguihen2@oracle.com',
    firstName: 'Roxy',
    lastName: 'Guihen',
    password: 'OOmo39z',
    address: '62626 Mcbride Place'
  },
  {
    email: 'pdunkinson3@yale.edu',
    firstName: 'Pattie',
    lastName: 'Dunkinson',
    password: 'kzPDviPT',
    address: '495 Macpherson Way'
  },
  {
    email: 'mhinckley4@tmall.com',
    firstName: 'Magdalena',
    lastName: 'Hinckley',
    password: 'IUE0Mhil',
    address: '1348 Birchwood Terrace'
  },
  {
    email: 'dcabrer5@cbslocal.com',
    firstName: 'Dewey',
    lastName: 'Cabrer',
    password: 'NKVfaHB2GojM',
    address: '57269 Annamark Hill'
  },
  {
    email: 'astubbington6@reuters.com',
    firstName: 'Annmarie',
    lastName: 'Stubbington',
    password: 'a4GTqHem3y',
    address: '7650 Holy Cross Park'
  },
  {
    email: 'greynish7@constantcontact.com',
    firstName: 'Gracia',
    lastName: 'Reynish',
    password: 'L0e9BHR',
    address: '9949 Clove Avenue'
  },
  {
    email: 'hfearnside8@bing.com',
    firstName: 'Honoria',
    lastName: 'Fearnside',
    password: 'GQEHMFJX3',
    address: '71 Killdeer Place'
  },
  {
    email: 'gplatts9@shutterfly.com',
    firstName: 'Glyn',
    lastName: 'Platts',
    password: 'wzskZE3ai',
    address: '848 Portage Lane'
  },
  {
    email: 'mquintona@github.io',
    firstName: 'Mickie',
    lastName: 'Quinton',
    password: 'pWswKgDT57K',
    address: '86 Tennessee Trail'
  },
  {
    email: 'rsuthrenb@oakley.com',
    firstName: 'Rudolph',
    lastName: 'Suthren',
    password: 'FVWOkrMY',
    address: '0906 Onsgard Way'
  },
  {
    email: 'pgeardc@technorati.com',
    firstName: 'Paolo',
    lastName: 'Geard',
    password: 'T6xYW5XgL',
    address: '0762 Spenser Point'
  },
  {
    email: 'lmylesd@feedburner.com',
    firstName: 'Llywellyn',
    lastName: 'Myles',
    password: '2KshGxA',
    address: '53 Bellgrove Hill'
  },
  {
    email: 'rdewitte@msu.edu',
    firstName: 'Raynard',
    lastName: 'Dewitt',
    password: 'hVBuoUI',
    address: '46 Marquette Place'
  },
  {
    email: 'rfeyerf@soundcloud.com',
    firstName: 'Renate',
    lastName: 'Feyer',
    password: 'xDWGbc',
    address: '4376 Talmadge Lane'
  },
  {
    email: 'dgildeag@php.net',
    firstName: 'Desiri',
    lastName: 'Gildea',
    password: 'EKs8t5DzF',
    address: '817 Crescent Oaks Hill'
  },
  {
    email: 'smilmithh@behance.net',
    firstName: 'Skipper',
    lastName: 'Milmith',
    password: 'EDcrZBhqTz2',
    address: '8702 Melody Point'
  },
  {
    email: 'cspaffordi@usatoday.com',
    firstName: 'Cookie',
    lastName: 'Spafford',
    password: 'oKw6a5',
    address: '8 Center Park'
  },
  {
    email: 'bswatonj@nsw.gov.au',
    firstName: 'Brenden',
    lastName: 'Swaton',
    password: 'GQecJoHq',
    address: '41 Dwight Center'
  }
]

const products = [
  {
    name: 'oracle.com',
    price: 9.22,
    description:
      'in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec',
    quantity: 27,
    imageUrl:
      'http://fixstream.com/wp-content/uploads/2015/08/oracle-logo-square.jpg'
  },
  {
    name: 'youtube1.com',
    price: 9.03,
    description:
      'varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia',
    quantity: 25,
    imageUrl: 'http://dummyimage.com/250x250.png/dddddd/000000'
  },
  {
    name: 'youtube.com',
    price: 5.31,
    description:
      'risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum',
    quantity: 10,
    imageUrl: 'http://dummyimage.com/250x250.png/ff4444/ffffff'
  },
  {
    name: 'e-recht24.de',
    price: 1.81,
    description:
      'pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla',
    quantity: 30,
    imageUrl: 'http://dummyimage.com/250x250.png/dddddd/000000'
  },
  {
    name: 'businessinsider.com',
    price: 5.71,
    description: 'a suscipit nulla elit ac nulla sed vel enim sit',
    quantity: 56,
    imageUrl: 'http://dummyimage.com/250x250.png/cc0000/ffffff'
  },
  {
    name: 'gmpg.org',
    price: 8.22,
    description:
      'potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus',
    quantity: 32,
    imageUrl: 'http://dummyimage.com/250x250.png/cc0000/ffffff'
  },
  {
    name: 'twitpic.com',
    price: 8.85,
    description:
      'rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo',
    quantity: 70,
    imageUrl: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff'
  },
  {
    name: 'wp.com',
    price: 0.7,
    description:
      'in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in',
    quantity: 7,
    imageUrl: 'http://dummyimage.com/250x250.png/cc0000/ffffff'
  },
  {
    name: 'seesaa.net',
    price: 2.46,
    description:
      'pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id',
    quantity: 90,
    imageUrl: 'http://dummyimage.com/250x250.jpg/ff4444/ffffff'
  },
  {
    name: 'last.fm',
    price: 8.76,
    description: 'sed nisl nunc rhoncus dui vel sem sed sagittis nam',
    quantity: 21,
    imageUrl: 'http://dummyimage.com/250x250.bmp/5fa2dd/ffffff'
  },
  {
    name: 'deliciousdays.com',
    price: 6.74,
    description:
      'libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est',
    quantity: 1,
    imageUrl: 'http://dummyimage.com/250x250.jpg/cc0000/ffffff'
  },
  {
    name: 'cbc.ca',
    price: 1.14,
    description:
      'vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean',
    quantity: 56,
    imageUrl: 'http://dummyimage.com/250x250.bmp/cc0000/ffffff'
  },
  {
    name: 'uol.com.br',
    price: 6.38,
    description:
      'odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla',
    quantity: 52,
    imageUrl: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff'
  },
  {
    name: 'mlb.com',
    price: 0.79,
    description:
      'erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc',
    quantity: 75,
    imageUrl: 'http://dummyimage.com/250x250.png/dddddd/000000'
  },
  {
    name: 'archive1.org',
    price: 2.13,
    description:
      'potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas',
    quantity: 48,
    imageUrl: 'http://dummyimage.com/250x250.bmp/5fa2dd/ffffff'
  },
  {
    name: 'netlog.com',
    price: 0.85,
    description:
      'elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis',
    quantity: 98,
    imageUrl: 'http://dummyimage.com/250x250.jpg/cc0000/ffffff'
  },
  {
    name: 'so-net.ne.jp',
    price: 6.35,
    description:
      'sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam',
    quantity: 4,
    imageUrl: 'http://dummyimage.com/250x250.bmp/cc0000/ffffff'
  },
  {
    name: 'wikispaces.com',
    price: 2.43,
    description:
      'odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat',
    quantity: 68,
    imageUrl: 'http://dummyimage.com/250x250.png/cc0000/ffffff'
  },
  {
    name: 'cargocollective.com',
    price: 5.02,
    description:
      'eget eros elementum pellentesque quisque porta volutpat erat quisque erat',
    quantity: 45,
    imageUrl: 'http://dummyimage.com/250x250.jpg/cc0000/ffffff'
  },
  {
    name: 'printfriendly.com',
    price: 9.7,
    description:
      'erat id mauris vulputate elementum nullam varius nulla facilisi cras non',
    quantity: 81,
    imageUrl: 'http://dummyimage.com/250x250.bmp/dddddd/000000'
  },
  {
    name: 'tmall.com',
    price: 1.86,
    description:
      'quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis',
    quantity: 5,
    imageUrl: 'http://dummyimage.com/250x250.jpg/cc0000/ffffff'
  },
  {
    name: 'ameblo.jp',
    price: 3.33,
    description:
      'a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque',
    quantity: 28,
    imageUrl: 'http://dummyimage.com/250x250.png/5fa2dd/ffffff'
  },
  {
    name: 'free.fr',
    price: 0.87,
    description:
      'a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum',
    quantity: 73,
    imageUrl: 'http://dummyimage.com/250x250.bmp/ff4444/ffffff'
  },
  {
    name: '4shared.com',
    price: 3.84,
    description:
      'porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse',
    quantity: 36,
    imageUrl: 'http://dummyimage.com/250x250.bmp/ff4444/ffffff'
  },
  {
    name: 'disqus.com',
    price: 1.17,
    description:
      'eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra',
    quantity: 56,
    imageUrl: 'http://dummyimage.com/250x250.jpg/dddddd/000000'
  },
  {
    name: 'techcrunch.com',
    price: 1.45,
    description:
      'justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula',
    quantity: 15,
    imageUrl: 'http://dummyimage.com/250x250.jpg/cc0000/ffffff'
  },
  {
    name: 'weebly.com',
    price: 1.42,
    description: 'ullamcorper augue a suscipit nulla elit ac nulla sed vel',
    quantity: 71,
    imageUrl: 'http://dummyimage.com/250x250.png/cc0000/ffffff'
  },
  {
    name: 'archive.org',
    price: 0.73,
    description:
      'tempus semper est quam pharetra magna ac consequat metus sapien ut nunc',
    quantity: 74,
    imageUrl: 'http://dummyimage.com/250x250.png/dddddd/000000'
  },
  {
    name: 'samsung.com',
    price: 9.44,
    description:
      'tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget',
    quantity: 70,
    imageUrl: 'http://dummyimage.com/250x250.bmp/cc0000/ffffff'
  },
  {
    name: 'miitbeian.gov.cn',
    price: 5.95,
    description:
      'quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non',
    quantity: 96,
    imageUrl: 'http://dummyimage.com/250x250.bmp/ff4444/ffffff'
  }
]

const carts = [
  {userId: 2, datePurchased: '2018-11-08 14:39:22'},
  {userId: 3, datePurchased: '2019-07-27 21:22:42'},
  {userId: 1, datePurchased: '2019-02-04 04:01:45'},
  {userId: 1, datePurchased: '2019-09-25 16:07:46'},
  {userId: 5, datePurchased: '2019-04-26 23:02:46'},
  {userId: 1, datePurchased: '2019-07-03 11:20:13'},
  {userId: 3, datePurchased: '2019-06-29 01:14:14'},
  {userId: 6, datePurchased: '2019-03-02 03:30:40'},
  {userId: 18, datePurchased: '2019-08-06 13:52:16'},
  {userId: 6, datePurchased: '2019-08-29 21:06:08'},
  {userId: 14, datePurchased: '2019-04-08 07:18:02'},
  {userId: 4, datePurchased: '2019-07-18 15:29:33'},
  {userId: 10, datePurchased: '2019-10-03 15:43:33'},
  {userId: 17, datePurchased: '2019-03-11 18:47:12'},
  {userId: 11, datePurchased: '2019-02-19 00:38:58'},
  {userId: 11, datePurchased: '2018-11-28 07:45:01'},
  {userId: 18, datePurchased: '2019-10-25 15:22:32'},
  {userId: 17, datePurchased: '2018-11-11 21:25:40'},
  {userId: 20, datePurchased: '2018-12-20 21:02:30'},
  {userId: 18, datePurchased: '2019-09-13 17:22:02'},
  {userId: 5, datePurchased: '2019-04-17 02:51:31'},
  {userId: 14, datePurchased: '2019-11-03 00:39:26'},
  {userId: 7, datePurchased: '2019-08-06 23:17:00'},
  {userId: 5, datePurchased: '2019-03-17 22:56:04'},
  {userId: 12, datePurchased: '2019-01-05 17:46:50'},
  {userId: 11, datePurchased: '2019-10-16 07:16:20'},
  {userId: 3, datePurchased: '2019-03-30 19:30:20'},
  {userId: 12, datePurchased: '2019-04-14 20:27:38'},
  {userId: 4, datePurchased: '2019-03-04 14:02:56'},
  {userId: 17, datePurchased: '2019-02-06 13:59:16'},
  {userId: 20}
]

const productsCart = [
  {cartId: 17, productId: 25, quantity: 1},
  {cartId: 7, productId: 26, quantity: 2},
  {cartId: 14, productId: 28, quantity: 3},
  {cartId: 9, productId: 9, quantity: 2},
  {cartId: 29, productId: 26, quantity: 1},
  {cartId: 30, productId: 12, quantity: 2},
  {cartId: 20, productId: 8, quantity: 2},
  {cartId: 24, productId: 7, quantity: 2},
  {cartId: 22, productId: 27, quantity: 2},
  {cartId: 27, productId: 22, quantity: 3},
  {cartId: 10, productId: 11, quantity: 2},
  {cartId: 10, productId: 22, quantity: 2},
  {cartId: 19, productId: 26, quantity: 3},
  {cartId: 29, productId: 29, quantity: 3},
  {cartId: 25, productId: 27, quantity: 3},
  {cartId: 11, productId: 18, quantity: 3},
  {cartId: 22, productId: 2, quantity: 1},
  {cartId: 12, productId: 7, quantity: 3},
  {cartId: 28, productId: 16, quantity: 3},
  {cartId: 8, productId: 26, quantity: 1},
  {cartId: 28, productId: 12, quantity: 1},
  {cartId: 6, productId: 10, quantity: 3},
  {cartId: 9, productId: 20, quantity: 1},
  {cartId: 6, productId: 12, quantity: 2},
  {cartId: 11, productId: 21, quantity: 2},
  {cartId: 10, productId: 18, quantity: 2},
  {cartId: 24, productId: 11, quantity: 2},
  {cartId: 9, productId: 14, quantity: 1},
  {cartId: 21, productId: 28, quantity: 2},
  {cartId: 23, productId: 11, quantity: 3},
  {cartId: 5, productId: 16, quantity: 3},
  {cartId: 27, productId: 27, quantity: 2},
  {cartId: 7, productId: 13, quantity: 1},
  {cartId: 20, productId: 12, quantity: 2},
  {cartId: 25, productId: 2, quantity: 2},
  {cartId: 4, productId: 22, quantity: 3},
  {cartId: 7, productId: 1, quantity: 3},
  {cartId: 20, productId: 25, quantity: 1},
  {cartId: 13, productId: 2, quantity: 2},
  {cartId: 11, productId: 25, quantity: 1},
  {cartId: 2, productId: 4, quantity: 1},
  {cartId: 1, productId: 6, quantity: 2},
  {cartId: 7, productId: 5, quantity: 1},
  {cartId: 15, productId: 10, quantity: 1},
  {cartId: 24, productId: 4, quantity: 2},
  {cartId: 2, productId: 8, quantity: 3},
  {cartId: 13, productId: 3, quantity: 3},
  {cartId: 25, productId: 28, quantity: 3},
  {cartId: 14, productId: 3, quantity: 3},
  {cartId: 19, productId: 6, quantity: 3},
  {cartId: 22, productId: 13, quantity: 1},
  {cartId: 15, productId: 27, quantity: 2},
  {cartId: 2, productId: 23, quantity: 2},
  {cartId: 4, productId: 20, quantity: 3},
  {cartId: 15, productId: 25, quantity: 3},
  {cartId: 22, productId: 19, quantity: 1},
  {cartId: 27, productId: 7, quantity: 2},
  {cartId: 19, productId: 1, quantity: 1},
  {cartId: 27, productId: 29, quantity: 2},
  {cartId: 22, productId: 5, quantity: 3},
  {cartId: 13, productId: 24, quantity: 2},
  {cartId: 8, productId: 20, quantity: 3},
  {cartId: 24, productId: 12, quantity: 1},
  {cartId: 9, productId: 30, quantity: 3},
  {cartId: 2, productId: 22, quantity: 2},
  {cartId: 14, productId: 2, quantity: 2},
  {cartId: 18, productId: 17, quantity: 3},
  {cartId: 31, productId: 28, quantity: 3},
  {cartId: 31, productId: 21, quantity: 1},
  {cartId: 31, productId: 7, quantity: 7}
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    carts.map(cart => {
      return Cart.create(cart)
    })
  )

  await Promise.all(
    productsCart.map(cart => {
      return ProductCart.create(cart)
    })
  )

  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error(err)
  db.close()
})
