import config from '~/config';

// Layouts
import { AdminLayout } from '~/layouts';

// Pages
import Advertise from '~/pages/Advertise';
import Article from '~/pages/Article';
import Home from '~/pages/Home';
import Travel from '~/pages/Travel';
import News from '~/pages/News';
import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Tour from '~/pages/Tour';
import NotFound from '~/pages/NotFound';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Cart from '~/pages/Cart';
import Book from '~/pages/Book';
import Payment from '~/pages/Payment';
import Confirm from '~/pages/ConfirmBook';

import AdminDashboard from '~/pages/Admin/Dashboard';
import AdminAccounts from '~/pages/Admin/Accounts';

// Public routes
const publicRoutes = [
    { path: config.routes.advertise, component: Advertise },
    { path: config.routes.article, component: Article },
    { path: config.routes.home, component: Home },
    { path: config.routes.travel, component: Travel },
    { path: config.routes.news, component: News },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.tour, component: Tour },
    { path: config.routes.notfound, component: NotFound, layout: null },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.book, component: Book },
    { path: config.routes.payment, component: Payment },
    { path: config.routes.confirm, component: Confirm },
    // Admin
    { path: config.routes.adminDashboard, component: AdminDashboard, layout: AdminLayout },
    { path: config.routes.adminAccounts, component: AdminAccounts, layout: AdminLayout },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
