import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
	},
	{
		path: 'user',
		loadChildren: () => import('./user/user-module').then(m => m.UserModule)
	},
	{
		path: 'products',
		loadChildren: () => import('./products/products-module').then(m => m.ProductsModule)
	},
	{
		path: 'cart',
		loadChildren: () => import('./cart/cart-module').then(m => m.CartModule)
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)
	},
	{
		path: 'search',
		loadChildren: () => import('./search/search-module').then(m => m.SearchModule)
	},
	{
		path: 'reviews',
		loadChildren: () => import('./reviews/reviews-module').then(m => m.ReviewsModule)
	},
	{
		path: 'testimonials',
		loadChildren: () => import('./testimonials/testimonials-module').then(m => m.TestimonialsModule)
	},
	{
		path: 'contact',
		loadChildren: () => import('./contact/contact-module').then(m => m.ContactModule)
	},
	{
		path: '',
		redirectTo: 'products',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'products'
	}
];
