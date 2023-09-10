export const contractorDashboardRoutes = [
    {
        path: 'test1',
        title: 'Test 1',
        loadComponent: () => import('../test1/test1.component').then(module => module.Test1Component),
    },
    {
        path: 'test2',
        title: 'Test 2',
        loadComponent: () => import('../test2/test2.component').then(module => module.Test2Component),
    }
]
