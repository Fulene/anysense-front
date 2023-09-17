export const dashboardRoutes = [
    {
        path: 'customer/test1',
        title: 'Test 1',
        loadComponent: () => import('../test1/test1.component').then(module => module.Test1Component),
    },
    {
        path: 'customer/test2',
        title: 'Test 2',
        loadComponent: () => import('../test2/test2.component').then(module => module.Test2Component),
    },
    {
      path: 'contractor/test1',
      title: 'Test 1',
      loadComponent: () => import('../test1/test1.component').then(module => module.Test1Component),
    },
    {
      path: 'contractor/test2',
      title: 'Test 2',
      loadComponent: () => import('../test2/test2.component').then(module => module.Test2Component),
    },
]
