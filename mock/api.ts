const mockProduct = {
  id: 1,
  title: 'NZ3三相电压表/电流表',
  imageUrl:
    'https://images.pexels.com/photos/3822859/pexels-photo-3822859.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  brand: '南自',
};

const mockProducts = [];
for (let i = 0; i < 100; i++) {
  mockProducts.push({ ...mockProduct, id: i, title: mockProduct.title + i });
}

export default {
  '/api/notice': {
    title: '经营范围',
    rows: [
      '电线电缆 照明开关 灯具线管 施耐德、常开、正泰',
      '德力西断路器 电力仪表 温湿度控制器 操控装置',
      '无线测温 电能表 电柜专用除湿器等低压元器件',
    ],
  },
  '/api/products': {
    items: mockProducts,
  },
  '/api/carousel': {
    items: [
      {
        id: 1,
        title: '电机1',
        imageUrl:
          'https://images.pexels.com/photos/3822859/pexels-photo-3822859.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      },
      {
        id: 2,
        title: '电机2',
        imageUrl:
          'https://images.pexels.com/photos/1571736/pexels-photo-1571736.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: 3,
        title: '电机3',
        imageUrl:
          'https://images.pexels.com/photos/3822859/pexels-photo-3822859.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      },
      {
        id: 4,
        title: '电机4',
        imageUrl:
          'https://images.pexels.com/photos/1571736/pexels-photo-1571736.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
    ],
  },
  '/api/categories': {
    items: [
      {
        id: 1,
        name: '电线电缆',
        subCategories: [
          {
            id: 11,
            name: '11',
          },
          {
            id: 12,
            name: '12',
          },
          {
            id: 13,
            name: '13',
          },
        ],
      },
      {
        id: 2,
        name: '照明开关',
        subCategories: [
          {
            id: 21,
            name: '11',
          },
          {
            id: 22,
            name: '12',
          },
          {
            id: 23,
            name: '13',
          },
        ],
      },
      {
        id: 3,
        name: '电力仪表',
        subCategories: [
          {
            id: 31,
            name: '11',
          },
          {
            id: 32,
            name: '12',
          },
          {
            id: 33,
            name: '13',
          },
        ],
      },
      {
        id: 4,
        name: '电表',
        subCategories: [
          {
            id: 41,
            name: '11',
          },
          {
            id: 42,
            name: '12',
          },
          {
            id: 43,
            name: '13',
          },
        ],
      },
    ],
  },
};
