import config from '~/config';

// Layouts
import { AdminLayout } from '~/layouts';

// Pages
import Advertise from '~/pages/Advertise';
import Article from '~/pages/Article';
import Home from '~/pages/Home';
import Travel from '~/pages/Travel';
import News from '~/pages/News';
import NewsDetail from '~/pages/NewsDetail';
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
import AccInfo from '~/pages/AccInfo';
import BookingHistory from '~/pages/BookingHistory';

import AdminDashboard from '~/pages/Admin/Dashboard';
import AdminAccounts from '~/pages/Admin/Accounts';
import AdminTours from '~/pages/Admin/Tours';
import AdminTourCreate from '~/pages/Admin/Tours/Create';
import AdminTourUpdate from '~/pages/Admin/Tours/Update';
import AdminTourSchedules from '~/pages/Admin/TourSchedules';
import AdminTourScheduleUpdate from '~/pages/Admin/TourSchedules/Update';
import AdminTourDetails from '~/pages/Admin/TourDetails';
import AdminTourDetailCreate from '~/pages/Admin/TourDetails/Create';
import AdminTourDetailUpdate from '~/pages/Admin/TourDetails/Update';
import AdminArticles from '~/pages/Admin/Article';
import AdminArticleCreate from '~/pages/Admin/Article/Create';
import AdminArticleUpdate from '~/pages/Admin/Article/Update';
import AdminContacts from '~/pages/Admin/Contact';
import AdminFAQ from '~/pages/Admin/FAQ';
import AdminFAQCreate from '~/pages/Admin/FAQ/Create';
import AdminFAQUpdate from '~/pages/Admin/FAQ/Update';
import AdminContactEmail from '~/pages/Admin/ContactEmail';
import AdminContactEmailDetail from '~/pages/Admin/ContactEmail/Detail';
import AdminNews from '~/pages/Admin/News';
import AdminNewsCreate from '~/pages/Admin/News/Create';
import AdminNewsUpdate from '~/pages/Admin/News/Update';
import AdminRptRevenue from '~/pages/Admin/RptRevenue';
import AdminRptTourist from '~/pages/Admin/RptTourist';
import AdminTourGuide from '~/pages/Admin/TourGuide';
import AdminTourGuideCreate from '~/pages/Admin/TourGuide/Create';
import AdminTourGuideUpdate from '~/pages/Admin/TourGuide/Update';

// Public routes
const publicRoutes = [
    { path: config.routes.advertise, component: Advertise },
    { path: config.routes.article, component: Article },
    { path: config.routes.home, component: Home },
    { path: config.routes.travel, component: Travel },
    { path: config.routes.news, component: News },
    { path: config.routes.newsDetail, component: NewsDetail },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.tour, component: Tour },
    { path: config.routes.notfound, component: NotFound, layout: null },
    { path: config.routes.search, component: Search },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.book, component: Book },
    { path: config.routes.payment, component: Payment },
    { path: config.routes.confirm, component: Confirm },
    { path: config.routes.accinfo, component: AccInfo },
    { path: config.routes.bh, component: BookingHistory },
    // Admin
    { path: config.routes.adminDashboard, component: AdminDashboard, layout: AdminLayout },
    { path: config.routes.adminAccounts, component: AdminAccounts, layout: AdminLayout },
    { path: config.routes.adminTours, component: AdminTours, layout: AdminLayout },
    { path: config.routes.adminTourCreate, component: AdminTourCreate, layout: AdminLayout },
    { path: config.routes.adminTourUpdate, component: AdminTourUpdate, layout: AdminLayout },
    { path: config.routes.adminTourSchedules, component: AdminTourSchedules, layout: AdminLayout },
    { path: config.routes.adminTourScheduleUpdate, component: AdminTourScheduleUpdate, layout: AdminLayout },
    { path: config.routes.adminTourDetails, component: AdminTourDetails, layout: AdminLayout },
    { path: config.routes.adminTourDetailCreate, component: AdminTourDetailCreate, layout: AdminLayout },
    { path: config.routes.adminTourDetailUpdate, component: AdminTourDetailUpdate, layout: AdminLayout },
    { path: config.routes.adminArticles, component: AdminArticles, layout: AdminLayout },
    { path: config.routes.adminArticleCreate, component: AdminArticleCreate, layout: AdminLayout },
    { path: config.routes.adminArticleUpdate, component: AdminArticleUpdate, layout: AdminLayout },
    { path: config.routes.adminContacts, component: AdminContacts, layout: AdminLayout },
    { path: config.routes.adminFAQ, component: AdminFAQ, layout: AdminLayout },
    { path: config.routes.adminFAQCreate, component: AdminFAQCreate, layout: AdminLayout },
    { path: config.routes.adminFAQUpdate, component: AdminFAQUpdate, layout: AdminLayout },
    { path: config.routes.adminContactEmail, component: AdminContactEmail, layout: AdminLayout },
    { path: config.routes.adminContactEmailDetail, component: AdminContactEmailDetail, layout: AdminLayout },
    { path: config.routes.adminNews, component: AdminNews, layout: AdminLayout },
    { path: config.routes.adminNewsCreate, component: AdminNewsCreate, layout: AdminLayout },
    { path: config.routes.adminNewsUpdate, component: AdminNewsUpdate, layout: AdminLayout },
    { path: config.routes.adminRptRevenue, component: AdminRptRevenue, layout: AdminLayout },
    { path: config.routes.adminRptTourist, component: AdminRptTourist, layout: AdminLayout },
    { path: config.routes.adminTourGuides, component: AdminTourGuide, layout: AdminLayout },
    { path: config.routes.adminTourGuideCreate, component: AdminTourGuideCreate, layout: AdminLayout },
    { path: config.routes.adminTourGuideUpdate, component: AdminTourGuideUpdate, layout: AdminLayout },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
